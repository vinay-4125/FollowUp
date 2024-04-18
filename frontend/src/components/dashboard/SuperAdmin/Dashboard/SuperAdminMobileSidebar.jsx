import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AlignLeft } from "lucide-react";
import { useMemo, useState } from "react";
import SuperAdminMobileNav from "./SuperAdminMobileNav";
import adminMenuItems from "./superadminMenuItems";

const SuperAdminMobileSidebar = () => {
  const [open, setOpen] = useState(false);
  const items = useMemo(() => adminMenuItems, []);

  return (
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
              <SuperAdminMobileNav items={items} setOpen={setOpen} />
              {/* <MobileDashboardNav items={items} setOpen={setOpen} /> */}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SuperAdminMobileSidebar;
