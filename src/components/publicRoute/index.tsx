import { Navigate, Outlet } from "react-router-dom";
import Constants from "../../helpers/constants";

const publicRoute = () => {
  const token = localStorage.getItem(Constants.ACCESS_TOKEN);
  return token ? <Navigate to="/home" /> : <Outlet />;
};

export default publicRoute;
