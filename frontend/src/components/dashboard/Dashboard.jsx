import { Outlet } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { toast, Toaster } from "sonner";
import { ScrollArea } from "../ui/scroll-area";

const Dashboard = () => {
  useEffect(() => {
    const socket = io("http://localhost:8000/");
    socket.on("emailSent", (data) => toast.success(data.message));
    // socket.on("whatsappSent", (data) => toast.success(data.message));
    return () => socket.disconnect();
  }, []);
  return (
    <>
      <DashboardHeader />
      <div className="flex overflow-hidden">
        {/* <div className="h-screen hidden lg:block fixed top-0 w-1/6"> */}
        <div className="fixed overflow-hidden">
          <ScrollArea className="h-full">
            <DashboardSidebar />
          </ScrollArea>
        </div>
        <main className="w-full pt-14 lg:ml-72 overflow-hidden">
          <Outlet />
        </main>
        <Toaster richColors position="bottom-left" />
      </div>
    </>
  );
};

export default Dashboard;

{
  /* <nav className="flex justify-between">
  <div className="block lg:hidden">
    <Link to="/">
      <h1>FollowUp.</h1>
    </Link>
  </div>
  <div></div>
  <div className="flex items-center justify-end">
    <EventForm />
  </div>
</nav> */
}
