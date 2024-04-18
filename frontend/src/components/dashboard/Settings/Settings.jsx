import { Heading } from "@/components/ui/heading";
import BreadCrumb from "../Breadcrumb";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PersonalDetails from "./PersonalDetails";
import Password from "./Password";
import PlanAndPricing from "./PlanAndPricing";
import Integration from "./Integration";
import { useSelector } from "react-redux";
import ProfilePicture from "./ProfilePicture";

const breadcrumbItems = [{ title: "Settings", link: "/dashboard/Settings" }];

const Settings = () => {
  const { user } = useSelector((state) => state.user);
  // const fetchUser = async () => {
  //   const res = await axios.get(`/api/getUserById/${user._id}`);
  //   return res.data.user;
  // };

  // const { data: state } = useQuery({
  //   queryKey: ["getUserById"],
  //   queryFn: fetchUser,
  //   // staleTime: 1000 * 1000,
  // });

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
      {/* <div className="flex-1 max-h-full overflow-auto space-y-4 p-4 md:p-8 pt-6"> */}
      <div className="flex-1 overflow-hidden space-y-4 p-4 md:p-8 pt-6">
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
            <TabsContent value="Personal Details">
              {user && (
                <>
                  <ProfilePicture user={user} />
                  <PersonalDetails user={user} />
                </>
              )}
            </TabsContent>
            <TabsContent value="Password">
              {user && <Password user={user} />}
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
