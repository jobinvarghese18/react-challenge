import { Outlet, Navigate } from "react-router-dom";
import Constants from "../../helpers/constants";

const privateRoutes = () => {
  const token = localStorage.getItem(Constants.ACCESS_TOKEN);
  return token ? <Outlet /> : <Navigate to="/" />;
};
export default privateRoutes;
