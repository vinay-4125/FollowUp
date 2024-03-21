import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ReminderDescription = ({ data }) => {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger className="">
          <div className="max-w-[30rem] text-justify 2xl:-mr-16 text-clip line-clamp-2">
            {data}
          </div>
        </TooltipTrigger>
        <TooltipContent className="max-w-[30rem]">{data}</TooltipContent>
        {/* {data} */}
      </Tooltip>
    </TooltipProvider>
  );
};

export default ReminderDescription;
