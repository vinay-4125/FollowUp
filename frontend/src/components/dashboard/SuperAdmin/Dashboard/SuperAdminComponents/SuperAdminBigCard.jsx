import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
const SuperAdminBigCard = ({ items }) => {
  const theme = localStorage.getItem("vite-ui-theme");
  // console.log(items);
  const data = items.map((item) => {
    return {
      date: `${item._id.day}/${item._id.month}`,
      total: item.count,
    };
  });
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Daily Reminders Count</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis
              dataKey="date"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              // tick={{ angle: 4, textAnchor: "start", dy: 10, dx: -5 }}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip
              contentStyle={
                theme == "dark"
                  ? {
                      backgroundColor: "black",
                      color: "white",
                      borderRadius: "15%",
                    }
                  : {
                      backgroundColor: "black",
                      color: "white",
                      borderRadius: "15%",
                    }
              }
            />
            <Legend />
            <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default SuperAdminBigCard;
