import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logout from "../auth/Logout";

const Navbar = () => {
  // const user = useSelector((state) => {
  //   console.log("state", state.user.userInfo.user?.username);
  //   state.user.userInfo.user?.userInfo;
  // });
  // console.log("userinfo", user);
  console.log("username", username);
  const username = true; //! changing this line
  return (
    <div>
      <nav className="relative w-full text-gray-700 px-8">
        <div className="container flex flex-col flex-wrap items-center justify-between py-5 mx-auto md:flex-row max-w-7xl">
          <p className="relative z-10 flex items-center w-auto text-4xl font-extrabold leading-none select-none">
            Follow Up.
          </p>
          <div className="relative z-10 inline-flex items-center space-x-3 mt-5 sm:mt-4 md:ml-5 lg:justify-end">
            {/* <button className="inline-flex items-center justify-center px-4 py-2 text-base leading-6 bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg hover:shadow-lg whitespace-nowrap shadow-md">
              <Link to="/login">Signin</Link>
            </button>
            <button className="inline-flex items-center justify-center px-4 py-2 text-base leading-6 bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg hover:shadow-lg whitespace-nowrap shadow-md">
              <Link to="/signup">Signup</Link>
            </button> */}
            {!username ? (
              <>
                <button className="inline-flex items-center justify-center px-4 py-2 text-base leading-6 bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg hover:shadow-lg whitespace-nowrap shadow-md">
                  <Link to="/login">Signin</Link>
                </button>
                <button className="inline-flex items-center justify-center px-4 py-2 text-base leading-6 bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg hover:shadow-lg whitespace-nowrap shadow-md">
                  <Link to="/signup">Signup</Link>
                </button>
              </>
            ) : (
              <>
                <h2 className="mr-5">{username}</h2>
                <Logout />
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

{
  /* <nav className="bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between">
            <div className="flex space-x-4">
              <div>
                <a
                  href="#"
                  className="flex items-center py-5 px-2 text-gray-700 hover:text-gray-900"
                >
                  <svg
                    className="h-6 w-6 mr-1 text-blue-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  <span className="font-bold">Better Dev</span>
                </a>
              </div>

              <div className="hidden md:flex items-center space-x-1">
                <a
                  href="#"
                  className="py-5 px-3 text-gray-700 hover:text-gray-900"
                >
                  Features
                </a>
                <a
                  href="#"
                  className="py-5 px-3 text-gray-700 hover:text-gray-900"
                >
                  Pricing
                </a>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-1">
              <a href="" className="py-5 px-3">
                Login
              </a>
              <a
                href=""
                className="py-2 px-3 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 hover:text-yellow-800 rounded transition duration-300"
              >
                Signup
              </a>
            </div>

            <div className="md:hidden flex items-center">
              <button className="mobile-menu-button">
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="mobile-menu hidden md:hidden">
          <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">
            Features
          </a>
          <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">
            Pricing
          </a>
        </div>
      </nav> */
}
