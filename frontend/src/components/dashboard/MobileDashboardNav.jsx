import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { User } from "lucide-react";
import { Icons } from "../Icon";
// import { Icons } from "../Icon";

const MobileDashboardNav = ({ items, setOpen }) => {
  const location = useLocation();
  if (!items?.length) {
    return null;
  }

  return (
    <nav className="grid items-start gap-2">
      {items.map((item, index) => {
        const Icon = Icons[item.icon || "arrowRight"];
        return (
          item.href && (
            <Link key={index} to={item.href} onClick={() => setOpen(false)}>
              <span
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  location.pathname === item.href ? "bg-accent" : "transparent"
                  // item.disabled && "cursor-not-allowed opacity-80"
                )}
              >
                <Icon className="mr-2 h-5 w-5" />
                <span>{item.title}</span>
              </span>
            </Link>
          )
        );
      })}
    </nav>
  );
};

export default MobileDashboardNav;
