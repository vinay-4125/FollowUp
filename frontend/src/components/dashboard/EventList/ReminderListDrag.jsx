import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";

import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { useCallback, useMemo, useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.scss";
import { useSelector } from "react-redux";
const DragAndDropCalendar = withDragAndDrop(Calendar);

const ReminderListDrag = () => {
  const localizer = momentLocalizer(moment);
  const { user } = useSelector((state) => state.user);

  const fetchMembers = async () => {
    const res = await axios.get(`/api/allRemindersById/${user._id}`);
    const events = res.data.allData.map((event) => ({
      title: event.data.reminder.eventName,
      start: new Date(
        `${event.data.reminder.date} ${event.data.reminder.time}`
      ),
      end: new Date(`${event.data.reminder.date} ${event.data.reminder.time}`),
    }));
    return events;
  };

  const { data: events } = useQuery({
    queryKey: ["getAllEvents"],
    queryFn: fetchMembers,
  });

  const [myEvents, setMyEvents] = useState(events);

  const moveEvent = useCallback(
    ({ event, start, end, isAllDay: droppedOnAllDaySlot = false }) => {
      const { allDay } = event;
      if (!allDay && droppedOnAllDaySlot) {
        event.allDay = true;
      }
      setMyEvents((prev) => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {};
        const filtered = prev.filter((ev) => ev.id !== event.id);
        const updatedEvents = [
          ...filtered,
          { ...existing, start, end, allDay },
        ];
        return updatedEvents;
      });
    },
    [setMyEvents]
  );

  const resizeEvent = useCallback(
    ({ event, start, end }) => {
      setMyEvents((prev) => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {};
        const filtered = prev.filter((ev) => ev.id !== event.id);
        return [...filtered, { ...existing, start, end }];
      });
    },
    [setMyEvents]
  );

  useMemo(() => {
    if (events) {
      setMyEvents(events);
    }
  }, [events]);


  return (
    <div className="h-screen mt-5 pb-16">
      {/* <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      // style={{ height: 500 }}
    /> */}
      {events && (
        <DragAndDropCalendar
          events={myEvents}
          className="h-5/6"
          // defaultDate={defaultDate}
          defaultView={Views.MONTH}
          localizer={localizer}
          onEventDrop={moveEvent}
          onEventResize={resizeEvent}
          startAccessor="start"
          endAccessor="end"
          popup
          resizable
        />
      )}
    </div>
  );
};

export default ReminderListDrag;
