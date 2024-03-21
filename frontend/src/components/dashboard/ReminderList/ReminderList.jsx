import BreadCrumb from "../Breadcrumb";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import ReminderTable from "./ReminderTable";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import axios from "axios";
import ListMembers from "./ListMembers";
import NotificationBadge from "./NotificationBadge";
import ReminderDescription from "./ReminderDescription";
import MemberAction from "../AddMember/MemberAction";

const breadcrumbItems = [
  { title: "ReminderList", link: "/dashboard/reminderlist" },
];

const ReminderList = () => {
  const { user } = useSelector((state) => state.user);
  const fetchMembers = async () => {
    const res = await axios.get(`/api/allRemindersById/${user._id}`);
    const reminders = res.data.allData.reminders.map((reminder) => ({
      title: reminder.reminderName,
      backgroundColor: reminder.color,
      start: new Date(`${reminder.date} ${reminder.time}`),
      end: new Date(`${reminder.date} ${reminder.time}`),
      description: reminder.description,
      date: reminder.date,
      time: reminder.time,
      notification: reminder.notification,
      listMembers: reminder.listMembers,
    }));
    return reminders;
  };
  const { data: reminders } = useQuery({
    queryKey: ["getAllReminders"],
    queryFn: fetchMembers,
  });

  const reminderColumn = [
    {
      header: "Reminder Name",
      accessorKey: "title",
    },
    {
      header: "Reminder Description",
      accessorKey: "description",
      size:100,
      cell: ({ row }) => (
        <ReminderDescription data={row.original.description} />
      ),
    },
    {
      header: "Date",
      accessorKey: "date",
    },
    {
      header: "Time",
      accessorKey: "time",
    },
    {
      header: "List Members",
      accessorKey: "listMembers",
      cell: ({ row }) => <ListMembers data={row.original.listMembers} />,
    },
    {
      header: "Notification",
      accessorKey: "notification",
      cell: ({ row }) => <NotificationBadge data={row.original.notification} />,
    },
    {
      id: "actions",
      enableHiding: false,
      header: "Actions",
      cell: ({ row }) => <MemberAction data={row.original} />,
    },
  ];

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <BreadCrumb items={breadcrumbItems} />
      <div>
        {reminders && (
          <Heading
            title={`ReminderList ${reminders?.length}`}
            description="Manage Reminders"
          />
        )}
      </div>
      <Separator />
      {reminders && <ReminderTable data={reminders} columns={reminderColumn} />}
    </div>
  );
};

export default ReminderList;
