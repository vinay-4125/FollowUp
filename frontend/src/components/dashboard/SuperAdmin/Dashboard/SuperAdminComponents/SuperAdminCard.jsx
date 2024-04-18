import { Icons } from "@/components/Icon";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Odometer from "react-odometerjs";

const SuperAdminCard = ({ items }) => {
  if (!items?.length) {
    return null;
  }
  return (
    <>
      {items.map((item, index) => {
        const Icon = Icons[item.icon || "arrowRight"];
        return (
          items && (
            <Card key={index}>
              <CardHeader className="flex flex-row justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {item.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  <Odometer value={item.odometerValue} format="(,ddd).dd" />
                </div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month(Dummy Text)
                </p>
              </CardContent>
            </Card>
          )
        );
      })}
    </>
  );
};

export default SuperAdminCard;
