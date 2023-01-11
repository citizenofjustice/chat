import { useSelector } from "react-redux";

export const useAuth = () => {
  const { user, token } = useSelector((state) => state.auth);

  return {
    isAuth: !!user,
    user,
    token,
  };
};
