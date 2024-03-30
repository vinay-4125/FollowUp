import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import "./SuperAdminComponents/odometer.css";
import SuperAdminCard from "./SuperAdminComponents/SuperAdminCard";
import SuperAdminBigCard from "./SuperAdminComponents/SuperAdminBigCard";
import CalendarDateRangePicker from "./SuperAdminComponents/CalendarDateRangePicker";
import { useState } from "react";
import { addDays, format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

const SuperAdminDashboardBody = () => {
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
    // await queryClient.invalidateQueries({
    //   queryKey: ["fetchTotalReminders"],
    //   refetchType: "all",
    // });
    await queryClient.invalidateQueries({ queryKey: ["fetchTotalReminders"] });
    await queryClient.invalidateQueries({ queryKey: ["fetchChartData"] });
  };
  // const handleDatePicker = async (selectedData) => {
  //   setDate(selectedData);
  //   console.log(":SELECTEDDATE:", date);
  //   await queryClient.invalidateQueries({
  //     queryKey: ["fetchTotalReminders"],
  //     refetchType: "active",
  //   });
  //   await queryClient.invalidateQueries({
  //     queryKey: ["fetchChartData"],
  //     refetchType: "active",
  //   });
  // };

  const fetchTotalReminders = async () => {
    const res = await axios.get("/api/getTotalNumberOfReminder", {
      params: { fromDate: date.from, toDate: date.to },
    });
    return res.data.result;
  };
  const fetchTotalUsers = async () => {
    const res = await axios.get("/api/getTotalNumberOfUser");
    return res.data.result;
  };
  const fetchChartData = async () => {
    const res = await axios.get("/api/getNumberOfDailyRemindersCreated", {
      params: { fromDate: date.from, toDate: date.to },
    });
    return res.data.result;
  };

  const { data: totalReminders } = useQuery({
    queryKey: ["fetchTotalReminders"],
    queryFn: fetchTotalReminders,
    enabled: !!date.from && !!date.to,
  });
  const { data: totalUsers } = useQuery({
    queryKey: ["fetchTotalUsers"],
    queryFn: fetchTotalUsers,
  });

  const { data: chartData } = useQuery({
    queryKey: ["fetchChartData"],
    queryFn: fetchChartData,
    enabled: !!date.from && !!date.to,
  });

  // console.log("charts", totalReminders);
  const cardData = [
    {
      title: "Total Reminders",
      odometerValue: totalReminders,
      icon: "calendar",
    },
    {
      title: "Total Reminders",
      odometerValue: totalUsers,
      icon: "user",
    },
  ];

  return (
    <>
      <div className="flex-1 h-screen space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h3 className="text-3xl font-bold tracking-tight">
            Hi, Welcome back 👋
          </h3>
          <div className="hidden sm:flex items-center space-x-2">
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
                    // defaultMonth={date?.from}
                    selected={date}
                    onSelect={handleSelectDate}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
            {/* <CalendarDateRangePicker handleDatePicker={handleDatePicker} /> */}
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <SuperAdminCard items={cardData} />
        </div>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
          {chartData && <SuperAdminBigCard items={chartData} />}
        </div>
      </div>
    </>
  );
};

export default SuperAdminDashboardBody;
