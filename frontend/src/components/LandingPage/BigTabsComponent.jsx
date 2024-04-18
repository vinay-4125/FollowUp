import { useTheme } from "../ThemeProvider";
import { Tabs } from "../ui/bigtabs";
import {
  dashboardHomePageImage,
  createReminderImage,
  membersPageImage,
  reminderListPageImage,
  dashboardHomePageImageDark,
  createReminderImageDark,
  memberPageImageDark,
  reminderPageImageDark,
} from "@/assets/ss_feb";

const ImageSkeleton = ({ lightImageSrc, darkImageSrc }) => {
  const { theme } = useTheme();
  const imageSrc = theme === "dark" ? darkImageSrc : lightImageSrc;
  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100">
      <img src={imageSrc} alt="" className="w-full rounded-t-lg" />
    </div>
  );
};

const BigTabsComponent = () => {
  const tabs = [
    {
      title: "Dashboard",
      value: "Dashboard",
      content: (
        <div className="border rounded-lg dark:border-white">
          <ImageSkeleton
            lightImageSrc={dashboardHomePageImage}
            darkImageSrc={dashboardHomePageImageDark}
          />
        </div>
      ),
    },
    {
      title: "Creating Reminder",
      value: "Creating Reminder",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-black dark:bg-white dark:text-black">
          <p className="mb-1">Creating Reminder</p>
          <ImageSkeleton
            lightImageSrc={createReminderImage}
            darkImageSrc={createReminderImageDark}
          />
        </div>
      ),
    },
    {
      title: "Members",
      value: "Members",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-black dark:bg-white dark:text-black">
          <p className="mb-1">Manage Members</p>
          <ImageSkeleton
            lightImageSrc={membersPageImage}
            darkImageSrc={memberPageImageDark}
          />
        </div>
      ),
    },
    {
      title: "Reminders",
      value: "Reminders",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-black dark:bg-white dark:text-black">
          <p className="mb-1">Manage Reminders</p>
          <ImageSkeleton
            lightImageSrc={reminderListPageImage}
            darkImageSrc={reminderPageImageDark}
          />
        </div>
      ),
    },
  ];
  return (
    <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start my-4">
      <Tabs tabs={tabs} />
    </div>
  );
};

export default BigTabsComponent;
