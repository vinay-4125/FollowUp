import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";

const ListMembers = ({ data }) => {
  const visibleData =
    data && data.length < 4 ? data.slice(0) : data.slice(0, 4);
  // const visibleData = data && data.slice(0, 4);
  const hiddenUsers = data && data.slice(4);
  return (
    // <TooltipProvider>
    //   <Tooltip>
    //     <div className="flex -mt-1 -space-x-2.5 pl-1 justify-start items-center overflow-hidden">
    //       {data.slice(0, 5).map((item, i) => (
    //         <div key={i}>
    //           <TooltipTrigger>
    //             <div className="h-10 w-10 text-white bg-black rounded-full relative inline-block ring-2 ring-white">
    //               <p className="flex text-white justify-center items-center h-10">
    //                 {item?.charAt(0).toUpperCase()}
    //               </p>
    //             </div>
    //           </TooltipTrigger>
    //           <TooltipContent>
    //             <p>{item}</p>
    //           </TooltipContent>
    //         </div>
    //       ))}
    //       {data.length > 5 && (
    //         <div className="h-10 w-10 text-white bg-black/30 rounded-full">
    //           <p className="flex justify-center items-center">
    //             +{data.length - 5}
    //           </p>
    //         </div>
    //       )}
    //     </div>
    //   </Tooltip>
    // </TooltipProvider>
    <div className="flex -mt-1 -space-x-2.5">
      {visibleData &&
        visibleData.map((item, index) => (
          <div key={index}>
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger>
                  <Avatar className="h-10 w-10 cursor-pointer">
                    <AvatarFallback className="border dark:border-slate-600">
                      {item[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        ))}
      <HoverCard>
        <HoverCardTrigger>
          {data && data.length > 4 && (
            <div className="h-10 w-10 text-white bg-black z-10 border dark:border-slate-600 -space-x-2.5 rounded-full">
              <p className="flex justify-center h-full items-center cursor-default">
                +{data.length - 5}
              </p>
            </div>
          )}
        </HoverCardTrigger>
        <HoverCardContent>
          {data &&
            hiddenUsers.map((item, index) => (
              <ScrollArea key={index}>
                <span>{item}</span>
                <Separator className="my-2" />
              </ScrollArea>
            ))}
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};

export default ListMembers;
