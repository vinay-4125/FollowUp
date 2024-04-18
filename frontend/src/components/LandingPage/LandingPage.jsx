import NewNav from "../Navbar/NewNav";
import { Link } from "react-router-dom";
import LandingPageIcons from "./LandingPageIcons";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import BigTabsComponent from "./BigTabsComponent";
import { useSelector } from "react-redux";
import {
  dashboardHomePageImage,
  dashboardHomePageImageDark,
} from "@/assets/ss_feb";
import { ContainerScroll } from "../ui/container-scroll-animation";
import { useTheme } from "../ThemeProvider";

const carousel = [
  {
    label: `DOCTORS -> PATIENTS`,
    heading: "Telemedicine",
    description: "To allow doctor to send appointment reminders to patients.",
  },
  {
    label: `COMPANIES -> CANDIDATES`,
    heading: "Companies",
    description: "To allow companies to book interviews with candidates.",
  },
  {
    label: `TEACHERS -> STUDENTS`,
    heading: "Teachers",
    description: "To allow teachers to schedule online classes with students.",
  },
];

const LandingPage = () => {
  const { user } = useSelector((state) => state.user);
  const { theme } = useTheme();
  const scrollImage =
    theme === "light" ? dashboardHomePageImage : dashboardHomePageImageDark;
  return (
    <div>
      <NewNav />
      <section className="space-y-6 pb-6 pt-6 md:pb-12 md:pt-14 lg:py-32">
        <div className="container flex max-w-[84rem] flex-col items-center gap-4 text-center">
          <div className="flex flex-col -mt-32 overflow-hidden">
            <ContainerScroll
              titleComponent={
                <div className="flex flex-col justify-center items-center mb-10">
                  <button className="relative mt-3 inline-flex h-12 overflow-hidden rounded-full p-[0.100rem] dark:p-0.5 focus:outline-none ">
                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                    <Link
                      to="/dashboard"
                      className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-muted text-black px-3 py-1 text-sm font-medium dark:bg-slate-950 dark:text-white backdrop-blur-3xl"
                    >
                      {user ? "Go to Dashboard" : "Get Started Now!!"}
                    </Link>
                  </button>
                  <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold">
                    Seamlessly manage reminders on Slack, WhatsApp, and Email.
                  </h1>
                  <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                    Effortlessly manage your reminders across Slack, WhatsApp,
                    and Email, ensuring you never miss a crucial moment.
                  </p>
                </div>
              }
            >
              <img
                src={scrollImage}
                alt="DashboardHomePage"
                height={720}
                width={1400}
                className="mx-auto rounded-2xl object-cover h-full object-left-top"
                draggable={false}
              />
            </ContainerScroll>
          </div>
        </div>
      </section>
      {/* <section className="space-y-6 pb-6 pt-6 md:pb-12 md:pt-14 lg:py-32">
        <ol className="flex max-w-[540px] flex-col pt-10 text-gray-50">
          <li className="relative h-[160px]" style={{ height: "160px" }}>
            <h2 className="font-cal leading-[100%] !leading-xs text-[32px] text-primary-700 !text-gray-50 duration-250 absolute top-0 transition-colors ease-in-out [&amp;:last-child]:top-6">
              Connect your calendars
            </h2>
            <span
              className="absolute top-10 text-gray-50"
              style={{ opacity: 1, visibility: "inherit" }}
            >
              Cal reads your availability from all your existing calendars
              ensuring you never get double booked!
            </span>
          </li>
          <li className="relative h-16 1">
            <h2
              className="font-cal leading-[100%] !leading-xs text-[32px] text-primary-700 !text-gray-50 duration-250 absolute top-0 transition-colors ease-in-out [&amp;:last-child]:top-6 !text-neutral-500"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                transform: "translate(0px)",
              }}
            >
              Set your availability
            </h2>
            <span
              className="absolute top-10 text-gray-50 opacity-0"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                transform: "translate(0px)",
                opacity: 0,
                visibility: "hidden",
              }}
            >
              Set repeating schedules for the times of the day and week that you
              want people to be able to book you.
            </span>
          </li>
          <li className="relative h-16 2">
            <h2
              className="font-cal leading-[100%] !leading-xs text-[32px] text-primary-700 !text-gray-50 duration-250 absolute top-0 transition-colors ease-in-out [&amp;:last-child]:top-6 !text-neutral-500"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                transform: "translate(0px)",
              }}
            >
              Share your link
            </h2>
            <span
              className="absolute top-10 text-gray-50 opacity-0"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                transform: "translate(0px)",
                opacity: 0,
                visibility: "hidden",
              }}
            >
              Share your short cal.com personal link and make it incredibly easy
              for people to book a meeting at a time that works for both of you!
            </span>
          </li>
          <li className="relative h-16 3">
            <h2
              className="font-cal leading-[100%] !leading-xs text-[32px] text-primary-700 !text-gray-50 duration-250 absolute top-0 transition-colors ease-in-out [&amp;:last-child]:top-6 !text-neutral-500"
              style={{
                translate: "none",
                rotate: "none",
                scale: "none",
                transform: "translate(0px)",
              }}
            >
              Let people book when it works for both of you
            </h2>
          </li>
        </ol>
      </section> */}
      <section className="space-y-6 pb-6 pt-6 md:pb-12 md:pt-14 lg:py-32 mx-auto">
        {/* <BentoGridComponent /> */}
        <div className="container flex flex-col max-w-[84rem] items-center gap-4 text-center">
          <h1 className="font-heading text-2xl sm:text-5xl md:text-6xl lg:text-7xl  font-semibold">
            Everything you need in a scheduling app
          </h1>
          <BigTabsComponent />
        </div>
      </section>
      <section className="space-y-6 pb-6 pt-6 md:pb-12 md:pt-14 lg:py-32">
        <div className="container flex max-w-[84rem] flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold">
            Scheduling that adapts to any business
          </h1>
          <Carousel
            className="max-w-xs sm:max-w-lg"
            plugins={[
              Autoplay({
                delay: 4000,
              }),
            ]}
            opts={{
              loop: true,
            }}
          >
            <CarouselContent className="h-full">
              {carousel.map((item, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card>
                      <CardContent className="aspect-square p-6 h-72 w-full">
                        <div className="flex flex-col justify-start items-start gap-10 mx-auto">
                          <Badge className="py-2 px-2.5 text-md ">
                            {item.label}
                          </Badge>
                          <div className="bg-black text-white rounded-xl text-start p-2 border-2 border-white">
                            <h2 className="border-none">{item.heading}</h2>
                            <div className="rounded-lg py-4 px-2 h-fit">
                              {item.description}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:block" />
            <CarouselNext className="hidden sm:block" />
          </Carousel>
        </div>
      </section>
      <section className="space-y-6 py-8 dark:bg-transparent md:py-12 lg:py-24 relative overflow-hidden">
        <div className="mx-auto w-full max-w-[2560px] px-4 md:px-[34px] relative  mt-16 overflow-hidden pb-4 md:my-28 md:py-28">
          <div className="absolute -z-10 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] blur-[40px] dark:h-[35rem] dark:blur-[90px] bg-white dark:bg-black rounded-full items-center  md:mx-auto md:w-[45rem] md:gap-8 md:text-center max-w-[1440px] h-[27rem]"></div>
          <div className="rounded-full flex flex-col items-center text-center md:mx-auto md:w-[30rem] py-10 md:gap-8 md:text-center">
            <h3 className="border-none leading-[100%] text-[40px] md:text-5xl lg:text-[50px] xl:text-6xl font-semibold">
              Connect your favorite apps
            </h3>
            <span className="mt-8 md:mt-0">
              Followup currently works with three apps; in the future, more apps
              will be added.
            </span>
            <div>
              <span className="rounded-4xl font-matter text-md items-center justify-center px-8 py-4 font-semibold uppercase leading-none [&amp;_svg]:ml-[8px] [&amp;_svg]:mt-[1px] shadow-fill hover:shadow-input-grow border-primary-700 active:shadow-input-shrink h-[50px] border-2 bg-gray-50 transition-all duration-150 ease-in-out will-change-transform hover:translate-y-[-2px] active:translate-y-[2px] active:duration-100 md:h-[80px]  group hidden max-w-[330px] cursor-pointer !text-black md:mx-auto md:flex">
                Explore all apps
                <div className="ml-2 scale-150">
                  <svg
                    className="stroke-black stroke-2"
                    fill="none"
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    aria-hidden="true"
                  >
                    <path
                      className="opacity-0 transition group-hover:opacity-100"
                      d="M0 5h7"
                    ></path>
                    <path
                      className="transition group-hover:translate-x-[3px]"
                      d="M1 1l4 4-4 4"
                    ></path>
                  </svg>
                </div>
              </span>
            </div>
          </div>

          {/* <div className="flex flex-col gap-4 opacity-70 overflow-hidden relative"> */}
          <div className="-z-20 -mx-4 flex flex-col items-center justify-center gap-2 py-2 md:absolute md:inset-0 md:mx-0 md:gap-7 opacity-55 ">
            <LandingPageIcons />
            <div className="relative left-52 sm:-left-10 md:-left-15">
              <LandingPageIcons />
            </div>
            <div className="relative -left-5 sm:left-10 md:left-15">
              <LandingPageIcons />
            </div>
            <LandingPageIcons />
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
