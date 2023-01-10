import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const isLoggedIn = useSelector((state) => state.auth.userIsLoggedIn);
  return isLoggedIn ? <Outlet /> : <Navigate to="/auth" replace />;
};
export default ProtectedRoutes;
