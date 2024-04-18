import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import { User, LayoutDashboardIcon } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
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
import { useTheme } from "../ThemeProvider";

const ImageSkeleton = ({ lightImageSrc, darkImageSrc }) => {
  const { theme } = useTheme();
  const imageSrc = theme === "dark" ? darkImageSrc : lightImageSrc;
  return (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100">
      <img src={imageSrc} alt="" className="w-full" />
    </div>
  );
};
const items = [
  {
    title: "User-Friendly Dashboard",
    description: "Explore the birth of groundbreaking ideas and inventions.",
    header: (
      <ImageSkeleton
        lightImageSrc={dashboardHomePageImage}
        darkImageSrc={dashboardHomePageImageDark}
      />
    ),
    className: "md:col-span-2",
    icon: <LayoutDashboardIcon className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Digital Revolution",
    description: "Dive into the transformative power of technology.",
    header: (
      <ImageSkeleton
        lightImageSrc={createReminderImage}
        darkImageSrc={createReminderImageDark}
      />
    ),
    className: "md:col-span-1",
    icon: <User className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Art of Design",
    description: "Discover the beauty of thoughtful and functional design.",
    header: (
      <ImageSkeleton
        lightImageSrc={membersPageImage}
        darkImageSrc={memberPageImageDark}
      />
    ),
    className: "md:col-span-1 md:h-[32rem]",
    icon: <User className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Power of Communication",
    description:
      "Understand the impact of effective communication in our lives.",
    header: (
      <ImageSkeleton
        lightImageSrc={reminderListPageImage}
        darkImageSrc={reminderPageImageDark}
      />
    ),
    className: "md:col-span-2 md:h-[32rem]",
    icon: <User className="h-4 w-4 text-neutral-500" />,
  },
];

const BentoGridComponent = () => {
  return (
    <BentoGrid className="max-w-7xl mx-auto md:auto-rows-[20rem] md:p-5 bg-slate-500 rounded-xl min-h-dvh">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={item.className}
          icon={item.icon}
        />
      ))}
    </BentoGrid>
  );
};

export default BentoGridComponent;
