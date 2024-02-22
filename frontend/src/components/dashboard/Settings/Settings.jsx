import { Heading } from "@/components/ui/heading";
import BreadCrumb from "../Breadcrumb";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PersonalDetails from "./PersonalDetails";
import Password from "./Password";
import PlanAndPricing from "./PlanAndPricing";
import Integration from "./Integration";

const breadcrumbItems = [{ title: "Settings", link: "/dashboard/Settings" }];

const Settings = () => {
  const tabValue = [
    {
      value: "Personal Details",
    },
    {
      value: "Password",
    },
    {
      value: "Plan & Pricing",
    },
    {
      value: "Integration",
    },
  ];
  return (
    <>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />

        <div>
          <Heading title={`Settings`} />
        </div>
        <Separator />

        <Tabs defaultValue="Personal Details" className="h-screen">
          <TabsList className="h-14">
            {tabValue.map((item, id) => (
              <TabsTrigger key={id} value={item.value} className="text-md h-10">
                {item.value}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="min-h-full">
            <TabsContent value="Personal Details">
              <PersonalDetails />
            </TabsContent>
            <TabsContent value="Password">
              <Password />
            </TabsContent>
            <TabsContent value="Plan & Pricing">
              <PlanAndPricing />
            </TabsContent>
            <TabsContent value="Integration">
              <Integration />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </>
  );
};

export default Settings;
