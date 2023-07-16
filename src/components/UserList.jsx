import { signOut } from "firebase/auth";
import { auth } from "../Firebase";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../Firebase";
import { ChatContaxt } from "../Context/ChatContaxt";
import { FaSearch } from "react-icons/fa";

function UserList() {
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContaxt);
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const [chats, setChats] = useState([]);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", userName)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };
  const handleKey = () => {
    handleSearch();
  };
  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      setErr(true);
    }

    setUser(null);
    setUserName("");
  };

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);
  const handleSelected = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };
  return (
    <div className="w-1/4 h-full bg-gray-900 flex items-center justify-center flex-col">
      <span className="w-full h-1/4 border-b mb-1 border-gray-400 flex items-center justify-center relative flex-col">
        <span className="w-full absolute top-0 flex items-center justify-center md:justify-between mb-2 bg-black">
          <span className="flex items-center justify-center p-1">
            <img
              src={currentUser.photoURL}
              alt="userPic"
              className="h-10 w-10 mx-2 my-1 object-cover rounded-xl border border-gray-400 hidden md:flex"
            />
            <h1 className="text-white font-semibold text-base mx-2 uppercase hidden md:flex">
              {currentUser.displayName}
            </h1>
          </span>
          <button
            className="w-full h-full md:w-20 bg-red-600 text-white py-1 cursor-pointer font-semibold shadow-xl my-2 md:mx-2 rounded-sm"
            onClick={() => signOut(auth)}
          >
            Logout
          </button>
        </span>
        <span className="w-full flex items-center justify-center px-2">
          <input
            type="text"
            placeholder="Search..."
            className="w-4/5 mt-5 h-9 bg-transparent px-1 md:px-4 border-b border-gray-400 text-white outline-none text-sm md:text-base placeholder:text-gray-600 placeholder:md:text-base placeholder:text-xs"
            onChange={(e) => setUserName(e.target.value)}
            onKeyDown={handleKey}
            value={userName}
          />
          <FaSearch
            className="text-gray-700 mt-4 text-xs md:text-base cursor-pointer"
            onClick={handleKey}
          />
        </span>

        {/* search user  */}
        {err && (
          <span className="text-red-500 text-sm my-2 flex items-center">
            User not found!
          </span>
        )}
        {user && (
          <span
            className="flex items-center justify-start w-full md:w-1/2  md:px-3 -mb-6 mt-2 rounded-md capitalize cursor-pointer hover:bg-gray-400 hover:text-black text-gray-400 py-1 border border-gray-700 shadow shadow-gray-700"
            onClick={handleSelect}
          >
            <img
              src={user.photoURL}
              alt="user"
              className="h-9 w-9 object-cover rounded-md"
            />
            <span className="mx-2 text-xs md:text-base font-semibold ">
              {user.displayName}
            </span>
          </span>
        )}
      </span>
      <div className="w-full h-4/5 flex items-center justify-center flex-col">
        <span className="w-full text-start px-5 md:px-7 text-gray-200">
          Contact
        </span>
        {/* user section  */}
        <div className="w-full h-full flex items-center justify-start flex-col md:px-10 py-5 overflow-y-auto overflow-hidden ">
          {/* user  */}
          {Object.entries(chats)
            ?.sort((a, b) => b[1].date - a[1].date)
            .map((chat) => (
              <span
                className="flex items-center justify-center md:justify-start md:w-full md:px-3  my-2 rounded-full cursor-pointer hover:bg-gray-400 hover:text-black text-gray-400 py-1 border border-gray-800 shadow shadow-gray-700"
                key={chat[0]}
                onClick={() => handleSelected(chat[1].userInfo)}
              >
                <img
                  src={chat[1].userInfo.photoURL}
                  alt="user"
                  className="w-12 h-12 object-cover rounded-full"
                />
                <span className="flex items-center justify-center flex-col">
                  <span className="mx-2 text-base font-semibold hidden md:flex">
                    {chat[1].userInfo.displayName}
                  </span>
                  <span className="mx-2 text-sm font-semibold hidden md:flex">
                    {chat[1].lastMessage?.text}
                  </span>
                </span>
              </span>
            ))}
        </div>
      </div>
    </div>
  );
}

export default UserList;
