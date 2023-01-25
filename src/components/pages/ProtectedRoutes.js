import { Navigate } from "react-router-dom";

/**
 * Component for restricting access based on authentication status
 * @param {*} props
 * @returns JSX being wrapped with this component / or navigating to a specified path
 */
const ProtectedRoutes = (props) => {
  if (!props.allowed) {
    return <Navigate to={props.path} replace />;
  } else return props.children;
};

export default ProtectedRoutes;
