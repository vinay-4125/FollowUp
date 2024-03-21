import { Badge } from "@/components/ui/badge";

const NotificationBadge = ({ data }) => {
//   console.log(data);
  return (
    <>
      {data &&
        data.map((item, index) => (
          <div key={index} className="m-1">
            <Badge>{item}</Badge>
          </div>
        ))}
    </>
  );
};

export default NotificationBadge;
