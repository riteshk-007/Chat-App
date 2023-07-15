import { LuImagePlus } from "react-icons/lu";
import { RiSendPlane2Fill } from "react-icons/ri";
import { MdCall, MdEmojiEmotions } from "react-icons/md";
import { BsFillCameraVideoFill, BsFillInfoCircleFill } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";
import { useContext, useEffect, useRef, useState } from "react";
import { ChatContaxt } from "../Context/ChatContaxt";
import {
  Timestamp,
  arrayUnion,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../Firebase";
import { AuthContext } from "../Context/AuthContext";
import { v4 as uuid } from "uuid";
import { getDownloadURL, uploadBytesResumable } from "firebase/storage";

function Chat() {
  const [showEmoji, setShowEmoji] = useState(false);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { data } = useContext(ChatContaxt);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-3/4 bg-gray-300 h-full flex items-center justify-center relative">
      {/* select user top  */}
      <div className="w-full h-16 bg-gray-800 flex items-center justify-center absolute top-0 z-50">
        <span className="w-1/2 h-full flex items-center justify-start ">
          <img
            src={data.user?.photoURL}
            alt="user"
            className="w-14 h-14 rounded-full object-cover p-1"
          />
          <span className="mx-3 font-semibold text-base text-gray-200 capitalize">
            {data.user?.displayName}
          </span>
        </span>
        <span className="w-1/2 h-full px-5 flex items-center justify-end">
          <MdCall className="mx-2 cursor-pointer text-gray-300" fontSize={20} />
          <BsFillCameraVideoFill
            className="mx-2 cursor-pointer text-gray-300"
            fontSize={20}
          />
          <BsFillInfoCircleFill
            className="mx-2 cursor-pointer text-gray-300"
            fontSize={20}
          />
        </span>
      </div>
      {/* messages area  */}
      <span
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-700 w-full h-5/6 overflow-y-auto flex flex-col items-start px-4 scrolled"
        onClick={() => setShowEmoji(false)}
      >
        {/* message */}
        {messages?.map((msg) => (
          <span
            ref={ref}
            className={`msg ${
              msg.senderId == currentUser.uid
                ? "w-full flex items-center justify-start flex-row-reverse mb-5"
                : "w-full flex items-center justify-end flex-row-reverse mb-5"
            }`}
            key={msg.id}
          >
            <span
              className={`${
                msg.senderId == currentUser.uid
                  ? "bg-green-500/80 py-1 md:py-2 rounded-md px-2 text-sm md:text-base md:px-3 flex-wrap max-w-sm md:font-semibold mt-3"
                  : "bg-gray-300 py-1 md:py-2 rounded-md px-2 text-sm md:text-base md:px-3 flex-wrap max-w-sm md:font-semibold mt-3"
              }`}
            >
              {msg.text}
              {msg.img && (
                <img src={msg.img} alt="" className="w-30 h-30 object-cover" />
              )}
            </span>
          </span>
        ))}
      </span>

      {/* sent messages input  */}
      <div className="w-full px-2 bg-gray-800 flex items-center justify-evenly absolute bottom-0 z-50">
        <span className="flex items-center justify-center">
          <span className="relative">
            <MdEmojiEmotions
              className="md:mx-2  cursor-pointer text-gray-400 md:text-2xl"
              onClick={() => setShowEmoji(!showEmoji)}
            />
            {showEmoji && (
              <span className="absolute bottom-10 left-5">
                <EmojiPicker />
              </span>
            )}
          </span>

          <input
            type="file"
            id="image"
            className="hidden"
            accept="/image*"
            onChange={(e) => setImg(e.target.files[0])}
          />
          <label htmlFor="image">
            <LuImagePlus className="md:mx-2 mx-1 cursor-pointer text-gray-400 md:text-2xl" />
          </label>
        </span>
        <span className="flex items-center justify-center w-4/5  md:mx-3">
          <textarea
            type="text"
            className=" w-full min-h-fit bg-gray-700 h-8 md:h-10 px-3 rounded-md outline-none text-white mx-1 my-3 md:my-4 flex  items-center"
            placeholder="Type a message"
            onChange={(e) => setText(e.target.value)}
            value={text}
          ></textarea>
        </span>
        <span>
          <RiSendPlane2Fill
            className="cursor-pointer text-gray-400 md:text-2xl"
            onClick={handleSend}
          />
        </span>
      </div>
    </div>
  );
}

export default Chat;
