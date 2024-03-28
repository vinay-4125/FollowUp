import React from "react";
import DashboardHeader from "../DashboardHeader";
import DashboardSidebar from "../DashboardSidebar";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import SuperAdminSidebar from "./Dashboard/SuperAdminSidebar";
import SuperAdminHeader from "./Dashboard/SuperAdminHeader";

const SuperAdminDashboard = () => {
  return (
    <>
      <SuperAdminHeader />
      <div className="flex h-screen overflow-hidden">
        {/* <div className="h-screen hidden lg:block fixed top-0 w-1/6"> */}
        <div className="fixed">
          <SuperAdminSidebar />
        </div>
        <main className="w-full pt-14 lg:ml-72 overflow-hidden">
          <Outlet />
        </main>
        <Toaster richColors position="bottom-left" />
      </div>
    </>
  );
};

export default SuperAdminDashboard;
