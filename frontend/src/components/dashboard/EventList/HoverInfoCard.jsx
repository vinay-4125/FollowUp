import { Badge } from "@/components/ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { CalendarIcon, Clock } from "lucide-react";

const HoverInfoCard = ({ event }) => {
  return (
    <HoverCard className="z-[100000000] ">
      <HoverCardTrigger
        className="text-white block rounded-sm pl-1.5"
        style={{ backgroundColor: event.backgroundColor, width: "100%" }}
      >
        {event.title}
      </HoverCardTrigger>
      <HoverCardContent
        side="top"
        className="bg-slate-100 dark:bg-slate-500 z-[1000]"
      >
        <div className="flex justify-between max-w-56">
          <div className="space-y-1 w-full">
            <h4 className="text-sm font-semibold">{event.title}</h4>
            <p className="text-sm">{event.description}</p>
            <div className="flex items-center pt-2 justify-between">
              <div className="flex ">
                <CalendarIcon className="mr-1 h-4 w-4 opacity-70" />{" "}
                <span className="text-xs text-muted-foreground">
                  {event.date}
                </span>
              </div>
              <div className="flex">
                <Clock className="mr-1 h-4 w-4 opacity-70" />
                <span className="text-xs text-muted-foreground">
                  {event.time}
                </span>
              </div>
            </div>
            <div className="pt-2 flex gap-1">
              {event.notification.map((item, index) => (
                <Badge
                  // style={{ backgroundColor: event.backgroundColor }}
                  key={index}
                >
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default HoverInfoCard;
