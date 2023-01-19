import { Navigate } from "react-router-dom";

const ProtectedRoutes = (props) => {
  if (!props.allowed) {
    return <Navigate to={props.path} replace />;
  } else return props.children;
};
export default ProtectedRoutes;
