import BreadCrumb from "../Breadcrumb";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import EventListDrag from "./EventListDrag";
import EventListCal from "./EventListCal";

const breadcrumbItems = [{ title: "EventList", link: "/dashboard/EventList" }];

const EventList = () => {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <BreadCrumb items={breadcrumbItems} />
      <div>
        <Heading title={`EventList`} />
      </div>
      <Separator />
      <EventListCal />
      {/* <EventListDrag /> */}
    </div>
  );
};

export default EventList;
