import axios from "axios";
import { useEffect, useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { toast, Toaster } from "sonner";
import { setUserLocalStorage } from "@/redux/slice/userSlice";
import { useDispatch } from "react-redux";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = async () => {
    const res = await axios.post("/api/requestGoogle");
    console.log(res.data);
    window.location.href = res.data.url;
    oauth();
  };

  const oauth = async () => {
    const res = await axios.get("/api/oauth");
    console.log(res.data);
  };

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevStat) => ({ ...prevStat, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/signup", formData);
      const data = res.data;
      dispatch(setUserLocalStorage(data));

      // console.log(data.user);
      navigate("/");
    } catch (error) {
      // console.log(error.response.data.error);
      // const { all, email, password } = error.response.data.error;
      // if (all) {
      //   toast.error(all);
      // }
      // if (email) {
      //   toast.error(email);
      // }
      // if (password) {
      //   toast.error(password);
      // }
      console.log(error.response.data.error);
      toast.error(error.response.data.error);
      // console.log(error.response.data.error);
    }
  };

  return (
    <section className="flex flex-col md:flex-row h-screen items-center text-black">
      <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
        {/* <Image
        src="https://source.unsplash.com/random"
        alt=""
        className="w-full h-full object-cover"
        width="100%"
        height="100%"
      /> */}
      </div>
      <div
        className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
      flex items-center justify-center"
      >
        <div className="w-full h-100">
          <div className="inline-block">
            <Link
              to="/"
              className="flex group text-blue-500 hover:text-blue-700 font-semibold"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 group-hover:animate-pulse"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
              <span className="px-2">Home</span>
            </Link>
          </div>
          <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
            Sign Up
          </h1>
          {/* {error && 
          <div
            className="bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700"
            role="alert"
          >
            {error}
          </div>
        } */}
          <form className="mt-6" method="POST" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700">Username</label>
              <input
                type="username"
                name="username"
                placeholder="Enter Username"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                required
                onChange={handleChange}
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter Email Address"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                required
                onChange={handleChange}
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                minLength={6}
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
            focus:bg-white focus:outline-none"
                required
                onChange={handleChange}
              />
            </div>
            <Button
              type="submit"
              className="w-full p-6 mt-10 dark:bg-black dark:text-white"

              // className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
              // px-4 py-3 mt-6"
            >
              Sign Up
            </Button>
            <hr className="my-6 border-gray-300 w-full" />
            <button
              type="button"
              onClick={() => auth()}
              className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300"
            >
              <div className="flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  viewBox="0 0 48 48"
                >
                  <defs>
                    <path
                      id="a"
                      d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                    />
                  </defs>
                  <clipPath id="b">
                    <use xlinkHref="#a" overflow="visible" />
                  </clipPath>
                  <path clipPath="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z" />
                  <path
                    clipPath="url(#b)"
                    fill="#EA4335"
                    d="M0 11l17 13 7-6.1L48 14V0H0z"
                  />
                  <path
                    clipPath="url(#b)"
                    fill="#34A853"
                    d="M0 37l30-23 7.9 1L48 0v48H0z"
                  />
                  <path
                    clipPath="url(#b)"
                    fill="#4285F4"
                    d="M48 48L17 24l-4-3 35-10z"
                  />
                </svg>
                <span className="ml-4">Log in with Google</span>
              </div>
            </button>
          </form>
          <p className="mt-8">
            Already have a account{" "}
            <Link to="/login">
              <a className="text-blue-500 hover:text-blue-700 font-semibold">
                Login
              </a>
            </Link>
          </p>
        </div>
      </div>
      <Toaster position="bottom-left" richColors />
    </section>
  );
};

export default Signup;
