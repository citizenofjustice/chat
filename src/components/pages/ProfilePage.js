import { Outlet } from "react-router-dom";

import Profile from "../Profile/Profile";

/**
 * Component that renders Profile page, always displays Profile
 * displays additional content through outlet
 * @returns profile page
 */
const ProfilePage = () => {
  return (
    <>
      <Profile />
      <Outlet />
    </>
  );
};

export default ProfilePage;
