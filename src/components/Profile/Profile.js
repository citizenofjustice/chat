import { useSelector } from "react-redux";

import Avatar from "./Avatar";
import UserInfo from "./UserInfo";

import styles from "./Profile.module.scss";

const Profile = () => {
  // getting username data from redux
  const user = useSelector((state) => state.auth.user);
  return (
    <section className={styles.profile}>
      <Avatar />
      <UserInfo userName={user} />
    </section>
  );
};

export default Profile;
