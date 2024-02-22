import { useAuthContext } from "@/hooks/useAuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const data = useAuthContext();
  console.log("Data", data);
  console.log("user", data?.user);

  useEffect(() => {
    if (!data?.user) {
      navigate("/login");
    }
  }, [data, navigate]);

  return data?.user ? children : navigate("/login");
};

export default ProtectedRoute;
