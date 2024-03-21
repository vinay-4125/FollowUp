import { cn } from "@/lib/utils";
import DashboardNav from "./DashboardNav";
import menuItems from "./menuItems";
import { useMemo } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import UpcomingReminders from "./UpcomingReminder";
import { useQuery } from "@tanstack/react-query";

const DashboardSidebar = () => {
  const items = useMemo(() => menuItems, []);

  const { user } = useSelector((state) => state.user);

  const fetchUpcomingReminder = async () => {
    const res = await axios.get(`/api/upcomingreminder/${user._id}`);
    return res.data.result;
  };

  const { data } = useQuery({
    queryKey: ["fetchUpcomingReminder"],
    queryFn: fetchUpcomingReminder,
    staleTime: 1000 * 10,
  });

  return (
    <div className="">
      <nav
        className={cn(`relative hidden h-screen border-r pt-16 lg:block w-72`)}
      >
        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <div className="space-y-1">
              <h2 className="mb-2 px-4 text-xl font-semibold tracking-tight">
                Overview
              </h2>
              <DashboardNav items={items} />
            </div>
            <div>
              {/* <p>Upcoming Events</p> */}
              <div className="bg-slate-100 dark:bg-slate-800 h-[30rem] mt-10 rounded-md ">
                <UpcomingReminders reminders={data} />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default DashboardSidebar;
