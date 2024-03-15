import { Button } from "@/components/ui/button";
import axios from "axios";
import { Slack } from "lucide-react";
import { redirect } from "react-router-dom";

const Integration = () => {
  const handleSlackButton = async () => {
    try {
      // const res = await axios.get("/api/addSlack");
      // console.log(res);
      window.open(
        "https://3db5-49-36-91-22.ngrok-free.app/slack/install/workspace",
        "_blank"
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <p>If you want to integrate Slack Click below button.</p>

      <Button onClick={handleSlackButton}>
        <Slack className="mr-2" /> Add Slack
      </Button>
    </div>
  );
};

export default Integration;
