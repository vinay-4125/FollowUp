import BreadCrumb from "../Breadcrumb";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import ReminderListCal from "./ReminderListCal";

const breadcrumbItems = [{ title: "EventList", link: "/dashboard/EventList" }];

const ReminderList = () => {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <BreadCrumb items={breadcrumbItems} />
      <div>
        <Heading title={`EventList`} />
      </div>
      <Separator />
      <ReminderListCal />
    </div>
  );
};

export default ReminderList;
