import { discordLogoBlue, slackLogo } from "@/assets/ss_feb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { useSelector } from "react-redux";

const Integration = () => {
  const { user } = useSelector((state) => state.user);
  const handleSlackButton = async () => {
    try {
      window.open(
        "https://3db5-49-36-91-22.ngrok-free.app/slack/install/workspace",
        "_blank"
      );
      const res = await axios.post("/api/sendUserId", { _userId: user._id });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDiscordButton = async () => {
    try {
      const res = await axios.get("/api/discordBotUrl");
      window.open(res.data.url, "_blank");
      // const result = await axios.post("/api/addUserIdAndMembersForDiscord", {
      //   _userId: user._id,
      // });
      // console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const connection = [
    {
      title: "Slack",
      icon: slackLogo,
      description:
        "Use slack to send notification to team members through your own custom hooks.",
      connected: user.slackId,
      handleClickFunc: handleSlackButton,
    },
    {
      title: "Discord",
      icon: discordLogoBlue,
      description: "Connect your discord to send notification and messages",
      connected: user.discordId,
      handleClickFunc: handleDiscordButton,
    },
  ];

  return (
    // <div className="flex flex-col gap-5">
    //   <p>If you want to integrate Slack Click below button.</p>

    //   <Button onClick={handleSlackButton} className="sm:w-1/2 md:w-1/3">
    //     <Slack className="mr-2" /> Add Slack
    //   </Button>
    //     </div>
    <div className="flex flex-col gap-3">
      <h2 className="font-semibold border-none">Integrations</h2>
      <p>
        Connect all your apps directly from here. You may need to connect these
        apps regularly to refresh verification.
      </p>
      {connection.map((item, index) => (
        <Card key={index} className="flex w-full items-center justify-between">
          <CardHeader className="flex flex-col gap-4">
            <div className="flex flex-row gap-2 ">
              <img
                src={item.icon}
                alt={item.title}
                className="object-contain h-8 w-8"
              />
            </div>
            <div>
              <CardTitle className="text-lg">{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </div>
          </CardHeader>
          <div className="flex flex-col items-center gap-2 p-4">
            {item.connected ? (
              <div className="border-bg-primary rounded-lg border-2 px-3 py-2 font-bold dark:text-white">
                Connected
              </div>
            ) : (
              <Button
                onClick={item.handleClickFunc}
                className=" rounded-lg bg-primary p-2 font-bold text-primary-foreground"
              >
                Connect
              </Button>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Integration;
