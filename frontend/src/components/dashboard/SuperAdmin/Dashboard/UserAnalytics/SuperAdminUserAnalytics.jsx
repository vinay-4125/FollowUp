import React from "react";
import BreadCrumb from "../../../Breadcrumb";
import SuperAdminBreadCrumb from "../SuperAdminBreadCrumb";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import SuperAdminUserTable from "./SuperAdminUserTable";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import SuperAdminUserProfilePicture from "./SuperAdminUserProfilePicture";
import SuperAdminUserAction from "./SuperAdminUserAction";

const breadcrumbItems = [
  { title: "User Analytics", link: "/superadmin/dashboard/useranalytics" },
];

const SuperAdminUserAnalytics = () => {
  const fetchAllUserRemindersCount = async () => {
    const res = await axios.get("/api/getAllUserReminderData");
    return res.data.result;
  };

  const { data } = useQuery({
    queryKey: ["fetchAllUserRemindersCount"],
    queryFn: fetchAllUserRemindersCount,
  });
  console.log(data);
  const userColumn = [
    {
      header: "Profile Pic",
      accessorKey: "userData.profilePicture",
      // accessor: "userData.profilePicture",
      cell: ({ row }) => (
        <SuperAdminUserProfilePicture data={row.original.userData} />
      ),
    },
    {
      header: "Username",
      accessorKey: "userData.username",
    },
    {
      header: "Email",
      accessorKey: "userData.email",
    },
    {
      header: "TotalReminders",
      accessorKey: "remindersCount",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => <SuperAdminUserAction data={row.original} />,
    },
  ];

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <SuperAdminBreadCrumb items={breadcrumbItems} />
      <Heading title={`Total User ${data?.length}`} description="Manage User" />
      <Separator />
      {data && <SuperAdminUserTable data={data} columns={userColumn} />}
    </div>
  );
};

export default SuperAdminUserAnalytics;
