import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Area,
  AreaChart,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const SuperAdminLineChart = ({ items }) => {
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
        <CardTitle>Total Success Reminder</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          {/* <LineChart
            width={730}
            height={250}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="date" />
            <YAxis />
            <Legend />
            <Line type="monotone" dataKey="total" stroke="#adfa1d" />
            <Area type="monotone" dataKey="total" stroke="#adfa1d" fillOpacity={1} fill="#eeeeee" />
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
          </LineChart> */}
          <AreaChart
            // width={730}
            // height={250}
            data={data}
            // margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
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

            <Area
              type="monotone"
              dataKey="total"
              stroke="#adfa1d"
              fillOpacity={1}
              fill="#adfa1d"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default SuperAdminLineChart;
