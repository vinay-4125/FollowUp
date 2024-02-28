import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import BreadCrumb from "../Breadcrumb";
import MemberTable from "./MemberTable";
import MemberAction from "./MemberAction";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const breadcrumbItems = [{ title: "Member", link: "/dashboard/Member" }];

const AddMember = () => {
  // const data = useMemo(() => movies, []);
  const fetchMembers = async () => {
    const res = await axios.get("/api/getmembers");
    return res.data.member;
  };

  const { data } = useQuery({
    queryKey: ["getMembers"],
    queryFn: fetchMembers,
  });

  const memberColumn = [
    {
      header: "Firstname",
      accessorKey: "firstname",
    },
    {
      header: "Lastname",
      accessorKey: "lastname",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Phonenumber",
      accessorKey: "phonenumber",
    },
    {
      header: "Slack-ID",
      accessorKey: "slackId",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => <MemberAction data={row.original} />,
    },
  ];
  // const movieColumns = [
  //   {
  //     header: "ID",
  //     accessorKey: "id",
  //   },
  //   {
  //     header: "Name",
  //     accessorKey: "name",
  //   },
  //   {
  //     header: "Genre",
  //     accessorKey: "genre",
  //   },
  //   {
  //     header: "Rating",
  //     accessorKey: "rating",
  //   },
  //   {
  //     id: "actions",
  //     cell: ({ row }) => <MemberAction data={row.original} />,
  //   },
  // ];

  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`Members ${data?.length}`}
            description="Manage members"
          />

          <Link
            to={"/dashboard/addmember/new"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />
        {data && <MemberTable data={data} columns={memberColumn} />}
      </div>
    </>
  );
};

export default AddMember;
