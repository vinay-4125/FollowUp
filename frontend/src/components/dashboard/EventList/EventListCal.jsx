import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";
import React, { useMemo } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";

const EventListCal = () => {
  const localizer = momentLocalizer(moment);

  // function getRandomColor() {
  //   var letters = "0123456789ABCDEF";
  //   var color = "#";
  //   for (var i = 0; i < 6; i++) {
  //     color += letters[Math.floor(Math.random() * 16)];
  //   }
  //   return color;
  // }

  const fetchMembers = async () => {
    const res = await axios.get("/api/allEventsById/65d5f0ab66b7081caf60b2aa");
    const events = res.data.allData.map((event) => ({
      title: event.data.reminder.eventName,
      backgroundColor: event.data.reminder.color,
      start: new Date(
        `${event.data.reminder.date} ${event.data.reminder.time}`
      ),
      end: new Date(`${event.data.reminder.date} ${event.data.reminder.time}`), // You may need to adjust this depending on your data model
    }));
    return events;
  };

  const { data: events } = useQuery({
    queryKey: ["getAllEvents"],
    queryFn: fetchMembers,
  });

  const components = useMemo(
    () => ({
      //   toolbar: ,
    }),
    []
  );

  return (
    <div className="h-screen mt-5 pb-16">
      <Calendar
        localizer={localizer}
        events={events}
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

export default EventListCal;
