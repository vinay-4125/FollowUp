import { AlignLeft } from "lucide-react";
import { useMemo, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import menuItems from "./menuItems";
import MobileDashboardNav from "./MobileDashboardNav";
import UpcomingReminders from "./UpcomingReminder";
import { useSelector } from "react-redux";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export function MobileSidebar() {
  const items = useMemo(() => menuItems, []);
  const [open, setOpen] = useState(false);
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
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <AlignLeft />
        </SheetTrigger>
        <SheetContent side="left" className="!px-0">
          <div className="space-y-4 py-4">
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                Overview
              </h2>
              <div className="space-y-1">
                <MobileDashboardNav items={items} setOpen={setOpen} />
              </div>
            </div>
          </div>
          <div className="bg-slate-100 dark:bg-slate-800 h-[30rem] mt-10 rounded-md m-3">
            <UpcomingReminders reminders={data} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
