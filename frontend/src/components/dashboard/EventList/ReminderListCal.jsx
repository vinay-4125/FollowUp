import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useSelector } from "react-redux";
import HoverInfoCard from "./HoverInfoCard";

const ReminderListCal = () => {
  const localizer = momentLocalizer(moment);
  const { user } = useSelector((state) => state.user);
  const clickRef = useRef(null);

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

  const buildMessage = (calEvent, eventType) => {
    return `Event ${eventType}: ${calEvent.title} at ${calEvent.start}`;
  };

  useEffect(() => {
    return () => {
      window.clearTimeout(clickRef?.current);
    };
  }, []);

  const onSelectEvent = useCallback((calEvent) => {
    window.clearTimeout(clickRef?.current);
    clickRef.current = window.alert(buildMessage(calEvent, "onSelectEvent"));
  }, []);

  const CustomToolbar = (toolbar) => {
    const goToBack = () => {
      toolbar.onNavigate("PREV");
    };

    const goToToday = () => {
      toolbar.onNavigate("TODAY");
    };

    const goToNext = () => {
      toolbar.onNavigate("NEXT");
    };

    const goToView = (view) => {
      toolbar.onView(view);
    };

    return (
      // <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
      <div className="flex flex-col justify-between items-center gap-5 mb-5 sm:gap-0 sm:flex-row">
        <span className="rbc-btn-group">
          <Button variant="outline" onClick={goToBack}>
            Back
          </Button>
          <Button variant="outline" onClick={goToToday}>
            Today
          </Button>
          <Button variant="outline" onClick={goToNext}>
            Next
          </Button>
        </span>
        <Button variant="outline" className="cursor-default">
          {toolbar.label}
        </Button>
        <span className="rbc-btn-group">
          <Button variant="outline" onClick={() => goToView("month")}>
            Month
          </Button>
          <Button variant="outline" onClick={() => goToView("week")}>
            Week
          </Button>
          <Button variant="outline" onClick={() => goToView("day")}>
            Day
          </Button>
          <Button variant="outline" onClick={() => goToView("agenda")}>
            Agenda
          </Button>
        </span>
      </div>
    );
  };

  return (
    <div className="h-screen mt-5 md:pb-16 overflow-y-auto">
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
        onSelectEvent={onSelectEvent}
        components={{
          toolbar: CustomToolbar,
          eventWrapper: HoverInfoCard,
        }}
      />
    </div>
  );
};

export default ReminderListCal;
