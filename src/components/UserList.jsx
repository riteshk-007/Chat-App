import { signOut } from "firebase/auth";
import { auth } from "../Firebase";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

function UserList() {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="w-1/4 h-full bg-gray-900 flex items-center justify-center flex-col">
      <span className="w-full h-1/5 border-b-2 border-gray-400 flex items-center justify-center relative">
        <span className="w-full absolute top-0 flex items-center justify-between mb-2 bg-black">
          <span className="flex items-center justify-center p-1">
            <img
              src={currentUser.photoURL}
              alt="userPic"
              className="h-10 mx-2 my-1 object-cover rounded-full border-2 border-gray-400"
            />
            <h1 className="text-white font-semibold text-base mx-2 uppercase">
              {currentUser.displayName}
            </h1>
          </span>
          <button
            className="w-20 bg-red-600 text-white py-1 cursor-pointer font-semibold shadow-xl mx-2 rounded-sm"
            onClick={() => signOut(auth)}
          >
            Logout
          </button>
        </span>
        <input
          type="text"
          placeholder="Search..."
          className="w-4/5 mt-10 h-10 bg-gray-300 px-4 rounded-3xl border border-gray-400 text-black outline-none placeholder:text-gray-600"
        />
      </span>
      <div className="w-full h-4/5 flex items-center justify-center flex-col">
        <span className="w-full text-start px-7 text-gray-200">Contact</span>
        {/* user section  */}
        <div className="w-full h-full flex items-center justify-start flex-col px-10 py-5 overflow-y-auto overflow-hidden ">
          {/* user  */}
          <span className="flex items-center justify-start w-full px-3  my-2 rounded-full cursor-pointer hover:bg-gray-400 hover:text-black text-gray-400 py-1 border border-gray-800 shadow shadow-gray-700">
            <img
              src="https://images.unsplash.com/photo-1688315029859-b191131291aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1539&q=80"
              alt="user"
              className="w-12 h-12 object-cover rounded-full"
            />
            <span className="mx-2 text-base font-semibold ">Harry Rowe</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default UserList;
