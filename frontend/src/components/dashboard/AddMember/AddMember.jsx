import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import BreadCrumb from "../Breadcrumb";
import { useMemo } from "react";

import movies from "./MOVIE_DATA.json";
import MemberTable from "./MemberTable";
import MemberAction from "./MemberAction";

const breadcrumbItems = [{ title: "Member", link: "/dashboard/Member" }];

const AddMember = () => {
  const data = useMemo(() => movies, []);

  const movieColumns = [
    {
      header: "ID",
      accessorKey: "id",
    },
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Genre",
      accessorKey: "genre",
    },
    {
      header: "Rating",
      accessorKey: "rating",
    },
    {
      id: "actions",
      cell: ({ row }) => <MemberAction data={row.original} />,
    },
  ];

  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`Members ${data.length}`}
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

        <MemberTable data={data} columns={movieColumns} />
      </div>
    </>
  );
};

export default AddMember;
