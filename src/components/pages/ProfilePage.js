import { Outlet } from "react-router-dom";
import Profile from "../Profile/Profile";

const ProfilePage = () => {
  return (
    <>
      <Profile />
      <Outlet />
    </>
  );
};

export default ProfilePage;
