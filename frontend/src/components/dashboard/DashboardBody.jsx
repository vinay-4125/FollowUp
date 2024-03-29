import { Heading } from "../ui/heading";
import DashboardMainBody from "./DashboardMainBody";

const DashboardBody = () => {
  return (
    <div className="flex-1 h-screen space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-start justify-between">
        <Heading title={`Hi, Welcome back 👋🏻`} description={""} />
      </div>
      <DashboardMainBody />
    </div>
  );
};

export default DashboardBody;
