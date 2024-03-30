import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

const CalendarDateRangePicker = ({ handleDatePicker }) => {
  const queryClient = useQueryClient();
  const dateNow = new Date();
  const dayNow = dateNow.getDate();
  const monthNow = dateNow.getMonth();
  const yearNow = dateNow.getFullYear();

  const [date, setDate] = useState({
    from: new Date(2024, 0, 1),
    to: addDays(new Date(yearNow, monthNow, dayNow), 1),
  });
  const handleSelectDate = async (selecteddate) => {
    setDate(selecteddate);
    handleDatePicker(selecteddate);
  };

  return (
    <div className={cn("grid gap-2")}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 mr-8" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelectDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CalendarDateRangePicker;
