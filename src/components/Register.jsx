import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../Firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

function Register() {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        () => {
          setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          });
        }
      );
    } catch (error) {
      setErr(true);
    }
  };
  const handleLogin = () => {
    setLoading(true);
    setInterval(() => {
      setLoading(false);
    }, 3000);
  };
  return (
    <form
      className="w-11/12 lg:w-1/3 py-5 md:py-10 bg-white  shadow-xl rounded-md overflow-hidden flex items-center justify-evenly flex-col px-4"
      onSubmit={handleSubmit}
    >
      <h1 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 uppercase">
        Register
      </h1>
      <input
        type="text"
        className=" border-b-[3px] border-blue-300 outline-none w-11/12 md:w-4/5 my-8 px-3"
        placeholder="DisplayName"
        required
      />
      <input
        type="text"
        className=" border-b-[3px] border-blue-300 outline-none w-11/12 md:w-4/5 my-8 px-3"
        placeholder="Email"
        required
      />
      <input
        type="password"
        className=" border-b-[3px] border-blue-300 outline-none w-11/12 md:w-4/5 my-8 px-3"
        placeholder="Password"
        autoComplete="true"
        required
      />
      <label
        htmlFor="file"
        className="w-full flex items-center justify-start px-4 md:px-10 "
      >
        <input
          type="file"
          id="file"
          className="hidden"
          accept="image/*"
          required
        />
        <span className="cursor-pointer flex items-center justify-center">
          <img src="/image.png" alt="avatar" className="h-9 mx-2" />
          <span className="capitalize text-xs md:text-base text-blue-400 font-semibold">
            Add an avatar
          </span>
        </span>
      </label>
      {err && (
        <span className="text-xs text-red-400 capitalize font-semibold">
          something went wrong please try again later.
        </span>
      )}
      <button
        className="w-11/12 md:w-4/5 my-8 px-3 bg-blue-400 py-2 rounded-lg shadow-md text-white font-semibold cursor-pointer"
        onClick={handleLogin}
      >
        {loading ? (
          <ClipLoader color="#fff" size={15} />
        ) : (
          <span>Register</span>
        )}
      </button>
      <span className="text-xs md:text-sm">
        you have a account ?
        <Link className="cursor-pointer mx-1 font-semibold" to={"/login"}>
          Login
        </Link>
      </span>
    </form>
  );
}

export default Register;
