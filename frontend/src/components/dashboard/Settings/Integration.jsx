import { Button } from "@/components/ui/button";
import axios from "axios";
import { Slack } from "lucide-react";
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
  return (
    <div className="flex flex-col gap-5">
      <p>If you want to integrate Slack Click below button.</p>
      
      <Button onClick={handleSlackButton} className="sm:w-1/2 md:w-1/3">
        <Slack className="mr-2" /> Add Slack
      </Button>
    </div>
  );
};

export default Integration;
