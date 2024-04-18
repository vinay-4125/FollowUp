import { CalendarClock } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";

const UpcomingReminders = ({ reminders }) => {
  return (
    <>
      {/* <h1 className="text-xl font-medium border-b border-slate-700 p-3">
        UpComingEvents
      </h1> */}
      <ScrollArea className="h-full w-full rounded-md border">
        <h1 className="text-base font-normal flex items-center gap-2 sticky bg-slate-300 dark:bg-slate-700 z-10 top-0 p-3">
          <CalendarClock size={20} />
          Upcoming Reminder
        </h1>
        <div className="p-1 pt-2">
          {reminders &&
            reminders
              .map((item, index) => (
                <div key={index}>
                  <div
                    className="text-sm px-4 rounded-md flex justify-between"
                    // style={{ backgroundColor: item.color }}
                  >
                    <div>
                      <div className="font-bold">{item.reminderName}</div>
                      <div className="flex flex-col">
                        {item.date}
                        <br />
                        {item.time}
                      </div>
                    </div>
                    <div>
                      {item.notification.map((data, index) => (
                        <Badge
                          key={index}
                          style={{ backgroundColor: item.color }}
                        >
                          {data}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Separator className="my-2" />
                </div>
              ))
              .reverse()}
        </div>
      </ScrollArea>
    </>
  );
};

export default UpcomingReminders;
