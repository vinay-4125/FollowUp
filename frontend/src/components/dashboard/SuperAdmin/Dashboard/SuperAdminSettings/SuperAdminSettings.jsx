import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSelector } from "react-redux";
import BreadCrumb from "@/components/dashboard/Breadcrumb";

const breadcrumbItems = [
  { title: "Settings", link: "/superadmin/dashboard/settings" },
];

const SuperAdminSettings = () => {

  const tabValue = [
    {
      value: "Personal Details",
    },
    {
      value: "Password",
    },
  ];
  return (
    <>
      <div className="flex-1 max-h-full overflow-x-hidden space-y-4 p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />

        <div>
          <Heading title={`Settings`} />
        </div>
        <Separator />

        <Tabs defaultValue="Personal Details">
          <TabsList className="mb-5 text-sm sm:text-base flex-wrap h-fit">
            {tabValue.map((item, id) => (
              <TabsTrigger key={id} value={item.value} className="text-md h-10">
                {item.value}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="">
            <TabsContent value="Personal Details">PersonalDetails</TabsContent>
            <TabsContent value="Password">Password</TabsContent>
          </div>
        </Tabs>
      </div>
    </>
  );
};

export default SuperAdminSettings;
