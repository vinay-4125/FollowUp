import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PublicRouteLogin = () => {
  const { token } = useSelector((state) => state.user);

  return token ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default PublicRouteLogin;
