import { Mail } from "lucide-react";

const SlackIcon = () => {
  return (
    <div className="md:rounded-4xl grid h-14 w-14 place-content-center rounded-2xl border-[1px] border-gray-300 p-[15px] dark:bg-slate-50 opacity-95 md:h-[100px] md:w-[100px] md:p-8">
      <div className="[&amp;>svg]:h-[25px] [&amp;>svg]:w-[25px] [&amp;>svg]:md:h-[50px] [&amp;>svg]:md:w-[50px]">
        <svg
          width="51"
          height="51"
          viewBox="0 0 51 51"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M26.9086 18.6667C26.9086 21.6123 29.2963 24 32.2419 24C35.1875 24 37.5753 21.6123 37.5753 18.6667V5.33333C37.5753 2.38781 35.1875 0 32.2419 0C29.2963 0 26.9086 2.38781 26.9086 5.33333V18.6667ZM5.57528 13.3333C2.62976 13.3333 0.241943 15.7211 0.241943 18.6667C0.241943 21.6123 2.62976 24 5.57528 24H18.9086C21.8542 24 24.2419 21.6123 24.2419 18.6667C24.2419 15.7211 21.8542 13.3333 18.9086 13.3333H5.57528ZM32.2419 26.6667C29.2963 26.6667 26.9086 29.0544 26.9086 32C26.9086 34.9456 29.2963 37.3333 32.2419 37.3333H45.5753C48.5209 37.3333 50.9086 34.9456 50.9086 32C50.9086 29.0544 48.5209 26.6667 45.5753 26.6667H32.2419ZM18.9086 50.6667C15.9631 50.6667 13.5753 48.2789 13.5753 45.3333V32C13.5753 29.0544 15.9631 26.6667 18.9086 26.6667C21.8542 26.6667 24.2419 29.0544 24.2419 32V45.3333C24.2419 48.2789 21.8542 50.6667 18.9086 50.6667ZM13.5753 5.33333C13.5753 2.38781 15.9631 0 18.9086 0C21.8542 0 24.2419 2.38781 24.2419 5.33333V10.6667H18.9086C15.9631 10.6667 13.5753 8.27885 13.5753 5.33333ZM0.241943 32C0.241943 34.9456 2.62976 37.3333 5.57528 37.3333C8.5208 37.3333 10.9086 34.9456 10.9086 32V26.6667H5.57528C2.62976 26.6667 0.241943 29.0544 0.241943 32ZM37.5753 45.3333C37.5753 48.2789 35.1875 50.6667 32.2419 50.6667C29.2963 50.6667 26.9086 48.2789 26.9086 45.3333V40H32.2419C35.1875 40 37.5753 42.3877 37.5753 45.3333ZM50.9086 18.6667C50.9086 15.7211 48.5209 13.3333 45.5753 13.3333C42.6297 13.3333 40.2419 15.7211 40.2419 18.6667V24H45.5753C48.5209 24 50.9086 21.6123 50.9086 18.6667Z"
            fill="black"
          ></path>
        </svg>
      </div>
    </div>
  );
};

const MailIcon = () => {
  return (
    <div className="md:rounded-4xl grid h-14 w-14 place-content-center rounded-2xl border-[1px] border-gray-300 p-[15px] dark:bg-slate-50 opacity-95 md:h-[100px] md:w-[100px] md:p-8">
      <div className="[&amp;>svg]:h-[25px] [&amp;>svg]:w-[25px] [&amp;>svg]:md:h-[50px] [&amp;>svg]:md:w-[50px]">
        <Mail size={51} color="black" />
      </div>
    </div>
  );
};

const WhatsappIcon = () => {
  return (
    <div className="md:rounded-4xl grid h-14 w-14 place-content-center rounded-2xl border-[1px] border-gray-300 p-[15px] dark:bg-slate-50 opacity-95 md:h-[100px] md:w-[100px] md:p-8">
      <div className="[&amp;>svg]:h-[25px] [&amp;>svg]:w-[25px] [&amp;>svg]:md:h-[50px] [&amp;>svg]:md:w-[50px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="50"
          height="50"
          viewBox="0 0 50 50"
        >
          <path d="M25,2C12.318,2,2,12.318,2,25c0,3.96,1.023,7.854,2.963,11.29L2.037,46.73c-0.096,0.343-0.003,0.711,0.245,0.966 C2.473,47.893,2.733,48,3,48c0.08,0,0.161-0.01,0.24-0.029l10.896-2.699C17.463,47.058,21.21,48,25,48c12.682,0,23-10.318,23-23 S37.682,2,25,2z M36.57,33.116c-0.492,1.362-2.852,2.605-3.986,2.772c-1.018,0.149-2.306,0.213-3.72-0.231 c-0.857-0.27-1.957-0.628-3.366-1.229c-5.923-2.526-9.791-8.415-10.087-8.804C15.116,25.235,13,22.463,13,19.594 s1.525-4.28,2.067-4.864c0.542-0.584,1.181-0.73,1.575-0.73s0.787,0.005,1.132,0.021c0.363,0.018,0.85-0.137,1.329,1.001 c0.492,1.168,1.673,4.037,1.819,4.33c0.148,0.292,0.246,0.633,0.05,1.022c-0.196,0.389-0.294,0.632-0.59,0.973 s-0.62,0.76-0.886,1.022c-0.296,0.291-0.603,0.606-0.259,1.19c0.344,0.584,1.529,2.493,3.285,4.039 c2.255,1.986,4.158,2.602,4.748,2.894c0.59,0.292,0.935,0.243,1.279-0.146c0.344-0.39,1.476-1.703,1.869-2.286 s0.787-0.487,1.329-0.292c0.542,0.194,3.445,1.604,4.035,1.896c0.59,0.292,0.984,0.438,1.132,0.681 C37.062,30.587,37.062,31.755,36.57,33.116z"></path>
        </svg>
      </div>
    </div>
  );
};

const LandingPageIcons = () => {
  return (
    <div className="flex gap-3 md:gap-10 overflow-hidden">
      <div className="flex relative -left-10 gap-3 md:gap-10 sm:-left-7 md:-left-5">
        <SlackIcon />
        <MailIcon />
        <WhatsappIcon />
        <SlackIcon />
        <MailIcon />
        <WhatsappIcon />
        <SlackIcon />
        <MailIcon />
        <WhatsappIcon />
        <SlackIcon />
        <MailIcon />
        <WhatsappIcon />
        <SlackIcon />
        <MailIcon />
        <WhatsappIcon />
        <SlackIcon />
        <MailIcon />
        <WhatsappIcon />
        <SlackIcon />
        <MailIcon />
        <WhatsappIcon />
        <SlackIcon />
        <MailIcon />
        <WhatsappIcon />
        <SlackIcon />
        <MailIcon />
        <WhatsappIcon />
        <SlackIcon />
        <MailIcon />
        <WhatsappIcon />
        <SlackIcon />
        <MailIcon />
        <WhatsappIcon />
        <SlackIcon />
        <MailIcon />
        <WhatsappIcon />
      </div>
    </div>
  );
};

export default LandingPageIcons;
