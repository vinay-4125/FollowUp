import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import ThemeToggle from "../ThemeToggle";
import UserNav from "../dashboard/UserNav";
import { useSelector } from "react-redux";

const NewNav = () => {
  const [state, setState] = useState(false);
  const { user } = useSelector((state) => state.user);
  const menus = [
    { title: "Signup", path: "/signup" },
    { title: "Login", path: "/login" },
  ];
  return (
    // <nav className="flex justify-between">
    //   <h1>
    //     <Link to="/">FollowUp.</Link>
    //   </h1>
    //   <div className="flex gap-5 items-center">
    //     <div className="md:hidden">
    //       <Button
    //         className="outline-none p-2 rounded-md focus:border-gray-400 focus:border"
    //         onClick={() => setState(!state)}
    //       >
    //         <Menu />
    //       </Button>
    //     </div>
    //     {/* <div className="hidden md:flex gap-5 items-center">
    //       <Link to="/signup">
    //         <Button className="min-w-30">Signup</Button>
    //       </Link>
    //       <Link to="/login">
    //         <Button className="min-w-30">Login</Button>
    //       </Link>
    //     </div> */}
    //     <div
    //       className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
    //         state ? "block" : "hidden"
    //       }`}
    //     >
    //       <ul className="justify-center items-center space-y-8 md:flex md:space-x-6 md:space-y-0">
    //         {menus.map((item, idx) => (
    //           <Link key={idx} to={`/${item.path}`}>
    //             <Button className="min-w-30">{item.title}</Button>
    //           </Link>
    //         ))}
    //       </ul>
    //     </div>
    //   </div>
    // </nav>
    <nav className="py-2 bg-black/0 backdrop-blur-lg supports-backdrop-blur:bg-background/60 border-b z-20 fixed w-full">
      <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
        <div className="flex items-center justify-between md:block">
          <Link to="/">
            <h1 className="text-5xl">FollowUp.</h1>
          </Link>
          <div className="md:hidden">
            <Button
              className="outline-none p-2 rounded-md focus:border-gray-400 focus:border"
              onClick={() => setState(!state)}
            >
              <Menu />
            </Button>
          </div>
        </div>
        <div
          className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
            state ? "block" : "hidden"
          }`}
        >
          <ul
            className={`justify-end items-center space-y-5 md:flex md:space-x-6 md:space-y-0 `}
          >
            {!user && !user ? (
              <>
                {menus.map((item, idx) => (
                  <li key={idx}>
                    <Link to={`${item.path}`}>
                      <Button className="min-w-30">{item.title}</Button>
                    </Link>
                  </li>
                ))}
              </>
            ) : (
              <>
                <span className="border-none">
                  <UserNav />
                </span>
                {/* <Logout /> */}
              </>
            )}
            <li>
              
              <ThemeToggle />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NewNav;
