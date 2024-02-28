import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";
import { useMemo } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useSelector } from "react-redux";

const ReminderListCal = () => {
  const localizer = momentLocalizer(moment);
  const { user } = useSelector((state) => state.user);

  // function getRandomColor() {
  //   var letters = "0123456789ABCDEF";
  //   var color = "#";
  //   for (var i = 0; i < 6; i++) {
  //     color += letters[Math.floor(Math.random() * 16)];
  //   }
  //   return color;
  // }

  const fetchMembers = async () => {
    const res = await axios.get(`/api/allRemindersById/${user._id}`);
    const reminders = res.data.allData.reminders.map((reminder) => ({
      title: reminder.reminderName,
      backgroundColor: reminder.color,
      start: new Date(`${reminder.date} ${reminder.time}`),
      end: new Date(`${reminder.date} ${reminder.time}`),
    }));
    // const reminders = res.data.allData.map((event) => ({
    //   title: event.data.reminder.reminderName,
    //   backgroundColor: event.data.reminder.color,
    //   start: new Date(
    //     `${event.data.reminder.date} ${event.data.reminder.time}`
    //   ),
    //   end: new Date(`${event.data.reminder.date} ${event.data.reminder.time}`),
    // }));
    return reminders;
  };

  const { data: reminders } = useQuery({
    queryKey: ["getAllReminders"],
    queryFn: fetchMembers,
  });
  // const components = useMemo(
  //   () => ({
  //     //   toolbar: ,
  //   }),
  //   []
  // );

  return (
    <div className="h-screen mt-5 pb-16 overflow-y-auto">
      <Calendar
        localizer={localizer}
        events={reminders}
        startAccessor="start"
        endAccessor="end"
        className="h-5/6"
        popup="true"
        toolbar="false"
        selectable="true"
        eventPropGetter={(event, start, end, isSelected) => ({
          event,
          start,
          end,
          isSelected,
          style: { backgroundColor: event.backgroundColor },
        })}
      />
    </div>
  );
};

export default ReminderListCal;
