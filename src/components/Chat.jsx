import { AiOutlineArrowLeft } from "react-icons/ai";
import { LuImagePlus } from "react-icons/lu";
import { RiSendPlane2Fill } from "react-icons/ri";
import { MdCall, MdEmojiEmotions } from "react-icons/md";
import { BsFillCameraVideoFill, BsFillInfoCircleFill } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";

function Chat() {
  const [showEmoji, setShowEmoji] = useState(false);
  return (
    <div className="w-3/4 bg-gray-300 h-full flex items-center justify-center relative">
      {/* select user top  */}
      <div className="w-full h-16 bg-gray-800 flex items-center justify-center absolute top-0 z-50">
        <span className="w-1/2 h-full flex items-center justify-start ">
          <span>
            <AiOutlineArrowLeft
              fontSize={20}
              className="mx-4 cursor-pointer text-gray-200"
            />
          </span>
          <img
            src="https://images.unsplash.com/photo-1688315029859-b191131291aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1539&q=80"
            alt="user"
            className="w-14 h-14 rounded-full object-cover p-1"
          />
          <span className="mx-3 font-semibold text-base text-gray-200">
            Seth Tran
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
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-700 w-full h-5/6 overflow-y-auto flex flex-col-reverse items-start px-4"
        onClick={() => setShowEmoji(false)}
      >
        {/* message */}
        {
          <span className="w-full flex items-center justify-start flex-row-reverse mb-5">
            <img
              src="https://images.unsplash.com/photo-1688315029859-b191131291aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1539&q=80"
              alt=""
              className="w-14 h-14 rounded-full object-cover mb-6 mx-1"
            />
            <span className="bg-green-500/70 py-2 rounded-md px-3 flex-wrap max-w-sm ">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Voluptate, nisi?
            </span>
          </span>
        }
      </span>

      {/* sent messages input  */}
      <div className="w-full px-2 bg-gray-800 flex items-center justify-evenly absolute bottom-0 z-50">
        <span className="flex items-center justify-center">
          <span className="relative">
            <MdEmojiEmotions
              fontSize={22}
              className="mx-2 cursor-pointer text-gray-400"
              onClick={() => setShowEmoji(!showEmoji)}
            />
            {showEmoji && (
              <span className="absolute bottom-10 left-5">
                <EmojiPicker />
              </span>
            )}
          </span>

          <input type="file" id="image" className="hidden" accept="/image*" />
          <label htmlFor="image">
            <LuImagePlus
              fontSize={22}
              className="mx-2 cursor-pointer text-gray-400"
            />
          </label>
        </span>
        <span className="flex items-center justify-center w-4/5  mx-3">
          <textarea
            type="text"
            className=" w-full min-h-fit bg-gray-700 h-10 px-3 rounded-md outline-none text-white my-4 flex  items-center"
            placeholder="Type a message"
          ></textarea>
        </span>
        <span>
          <RiSendPlane2Fill
            fontSize={23}
            className="cursor-pointer text-gray-400"
          />
        </span>
      </div>
    </div>
  );
}

export default Chat;
