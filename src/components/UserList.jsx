import { signOut } from "firebase/auth";
import { auth } from "../Firebase";
import { useContext, useState } from "react";
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
} from "firebase/firestore";
import { db } from "../Firebase";

function UserList() {
  const { currentUser } = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

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
    } catch (error) {
      setErr(true);
    }
  };
  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };
  const handleSelect = async () => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {
      console.log(error);
    }
    setUser(null);
    setUserName("");
  };
  return (
    <div className="w-1/4 h-full bg-gray-900 flex items-center justify-center flex-col">
      <span className="w-full h-1/4 border-b mb-1 border-gray-400 flex items-center justify-center relative flex-col">
        <span className="w-full absolute top-0 flex items-center justify-between mb-2 bg-black">
          <span className="flex items-center justify-center p-1">
            <img
              src={currentUser.photoURL}
              alt="userPic"
              className="h-10 mx-2 my-1 object-cover rounded-xl border border-gray-400"
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
          className="w-4/5 mt-5 h-9 bg-transparent px-4 border-b border-gray-400 text-white outline-none placeholder:text-gray-600"
          onChange={(e) => setUserName(e.target.value)}
          onKeyDown={handleKey}
          value={userName}
        />

        {/* search user  */}
        {err && (
          <span className="text-red-500 text-sm my-2 flex items-center">
            User not found!
          </span>
        )}
        {user && (
          <span
            className="flex items-center justify-start w-1/2 px-3 -mb-6 mt-2 rounded-md capitalize cursor-pointer hover:bg-gray-400 hover:text-black text-gray-400 py-1 border border-gray-700 shadow shadow-gray-700"
            onClick={handleSelect}
          >
            <img
              src={user.photoURL}
              alt="user"
              className="h-9 object-cover rounded-md"
            />
            <span className="mx-2 text-base font-semibold ">
              {user.displayName}
            </span>
          </span>
        )}
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
