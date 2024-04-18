import { cn } from "@/lib/utils";
import { useMemo } from "react";
import SuperAdminNav from "./SuperAdminNav";
import adminMenuItems from "./superadminMenuItems";

const SuperAdminSidebar = () => {
  const items = useMemo(() => adminMenuItems, []);
  return (
    <nav
      className={cn(`relative hidden h-screen border-r pt-16 lg:block w-72`)}
    >
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <h2 className="mb-2 px-4 text-xl font-semibold tracking-tight">
              SuperAdmin
            </h2>
            <SuperAdminNav items={items} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SuperAdminSidebar;
