import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Plus, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import BreadCrumb from "../Breadcrumb";
import MemberTable from "./MemberTable";
import MemberAction from "./MemberAction";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const breadcrumbItems = [{ title: "Member", link: "/dashboard/Member" }];

const AddMember = () => {
  // const data = useMemo(() => movies, []);
  const { user } = useSelector((state) => state.user);
  const fetchMembers = async () => {
    const res = await axios.get(`/api/getmembers/${user._id}`);
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
      enableHiding: false,
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
      // header: "Slack-ID",
      header: (
        <div className="flex items-center gap-1">
          SlackId
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-circle-help"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <path d="M12 17h.01" />
                </svg>
              </TooltipTrigger>
              <TooltipContent className="w-40">
                <p>To add slack member integrate followup with slack</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ),
      accessorKey: "slackId",
    },
    {
      id: "actions",
      enableHiding: false,
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
          {data && (
            <Heading
              title={`Members ${data?.length}`}
              description="Manage members"
            />
          )}

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
