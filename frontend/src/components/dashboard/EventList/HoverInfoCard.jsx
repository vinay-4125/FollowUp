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
        <div className="flex justify-between max-w-56 bg-black/10">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{event.title}</h4>
            <p className="text-sm">{event.description}</p>
            <div className="flex items-center pt-2 justify-between">
              <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                {event.date}
              </span>
              <Clock className="mr-2 h-4 w-4 opacity-70" />
              <span className="text-xs text-muted-foreground">
                {event.time}
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default HoverInfoCard;
