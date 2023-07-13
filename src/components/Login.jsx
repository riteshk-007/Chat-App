import ClipLoader from "react-spinners/ClipLoader";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
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
        Login
      </h1>
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
      {err && (
        <span className="text-xs text-red-400 capitalize font-semibold">
          something went wrong please try again later
        </span>
      )}
      <button
        className="w-11/12 md:w-4/5 my-8 px-3 bg-blue-400 py-2 rounded-lg shadow-md text-white font-semibold cursor-pointer outline-none"
        onClick={handleLogin}
      >
        {loading ? <ClipLoader color="#fff" size={15} /> : <span>Login</span>}
      </button>
      <span className="text-xs md:text-sm">
        you dont have a account ?
        <Link className="cursor-pointer mx-1 font-semibold" to={"/register"}>
          <span>Register</span>
        </Link>
      </span>
    </form>
  );
}

export default Login;
