import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

import React from "react";
import { Link } from "react-router-dom";

export default function SuperAdminBreadCrumb({ items }) {
  return (
    <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
      <Link
        to={"/superadmin/dashboard"}
        className="overflow-hidden text-ellipsis whitespace-nowrap"
      >
        SA Dashboard
      </Link>
      {items?.map((item, index) => (
        <React.Fragment key={item.title}>
          <ChevronRight className="h-4 w-4" />
          <Link
            to={item.link}
            className={cn(
              "font-medium",
              index === items.length - 1
                ? "text-foreground pointer-events-none"
                : "text-muted-foreground"
            )}
          >
            {item.title}
          </Link>
        </React.Fragment>
      ))}
    </div>
  );
}
