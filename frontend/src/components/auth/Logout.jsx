import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useAuthContext } from "@/hooks/useAuthContext";

const Logout = () => {
  const navigate = useNavigate();
  const { dispatch } = useAuthContext()
  const handleLogout = async () => {
    try {
      const res = await axios.get("/api/auth/logout");
      const data = res.data;
      localStorage.removeItem("user");

      dispatch({ type: "LOGOUT" });
      navigate("/");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button
      onClick={handleLogout}
      // className="inline-flex items-center justify-center px-4 py-2 text-base leading-6 bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg hover:shadow-lg whitespace-nowrap shadow-md"
    >
      Logout
    </Button>
  );
};

export default Logout;
