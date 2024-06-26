import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "sonner";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/forget-password", { email });
      toast.success("Email Sent");
      //   navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <section className="flex flex-col md:flex-row h-screen items-center">
        <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
          <div className="grid place-items-center h-screen"></div>
        </div>
        <div
          className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
      flex items-center justify-center"
        >
          <div className="w-full h-100">
            <div>
              <div className="inline-block">
                <Link
                  to="/login"
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
                  <span className="px-2">Login Page</span>
                </Link>
              </div>
              <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12 dark:text-black">
                Forget Password
              </h1>
              {/* {error && (
          <div
            className="bg-red-100 rounded-lg py-5 px-6 text-base text-red-700 mb-3"
            role="alert"
          >
            {error}
          </div>
        )} */}
              <form
                action="#"
                className="mt-6"
                method="POST"
                onSubmit={handleSubmit}
              >
                <div>
                  <label className="block text-gray-700 ">Email Address</label>
                  <input
                    type="email"
                    placeholder="Enter Email Address"
                    className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                    autoFocus
                    autoComplete="true"
                    //   required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full p-6 mt-6 dark:bg-black dark:text-white"

                  // className="w-full block text-white font-semibold rounded-lg px-4 py-3 mt-6 dark:bg-black"
                >
                  Submit
                </Button>
              </form>
            </div>
          </div>
        </div>
        <Toaster position="bottom-left" richColors />
      </section>
    </>
  );
};

export default ForgetPassword;
