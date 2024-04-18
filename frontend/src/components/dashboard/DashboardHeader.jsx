import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { MobileSidebar } from "./MobileSidebar";
import ThemeToggle from "../ThemeToggle";
import UserNav from "./UserNav";
import EventFormTwo from "./EventFormTwo";
import EventFormThree from "./EventFormThree";

const DashboardHeader = () => {
  return (
    <div className="fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur z-20">
      <nav className="h-14 flex items-center justify-between px-4">
        <div className="hidden lg:block">
          <Link to="/" className="flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            <h1 className="text-4xl lg:text-4xl mx-auto flex items-center justify-center">
              FollowUp.
            </h1>
          </Link>
        </div>
        <div className={cn("block lg:!hidden")}>
          <MobileSidebar />
        </div>

        <div className="flex items-center gap-5">
          {/* <UserNav /> */}
          {/* <EventForm /> */}
          {/* <EventFormOne /> */}
          {/* <EventFormTwo /> */}
          <EventFormThree />
          {/* {user && <h6>{user?.username}</h6>} */}
          <UserNav />
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
};

export default DashboardHeader;
