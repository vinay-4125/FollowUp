import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import "./SuperAdminComponents/odometer.css";
import SuperAdminCard from "./SuperAdminComponents/SuperAdminCard";
import SuperAdminBigCard from "./SuperAdminComponents/SuperAdminBigCard";

const SuperAdminDashboardBody = () => {
  const fetchTotalReminders = async () => {
    const res = await axios.get("/api/getTotalNumberOfReminder");
    return res.data.result;
  };
  const fetchTotalUsers = async () => {
    const res = await axios.get("/api/getTotalNumberOfUser");
    return res.data.result;
  };
  const fetchChartData = async () => {
    const res = await axios.get("/api/getNumberOfDailyRemindersCreated");
    return res.data.result;
  };

  const { data: totalReminders } = useQuery({
    queryKey: ["fetchTotalReminders"],
    queryFn: fetchTotalReminders,
  });
  const { data: totalUsers } = useQuery({
    queryKey: ["fetchTotalUsers"],
    queryFn: fetchTotalUsers,
  });

  const { data: chartData } = useQuery({
    queryKey: ["fetchChartData"],
    queryFn: fetchChartData,
  });

  // useEffect(() => {
  //   // const timeoutId = setTimeout(() => setValue(parseFloat(45231.24)), 2000);
  //   // return () => {
  //   //   clearTimeout(timeoutId);
  //   // };
  //   setValue(parseFloat(45231));
  // }, []);

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
