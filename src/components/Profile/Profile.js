import Avatar from "./Avatar";
import UserInfo from "./UserInfo";
import styles from "./Profile.module.scss";
// import authSlice from "../../store/auth-slice";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <section className={styles.profile}>
      <Avatar />
      <UserInfo userName={user} />
    </section>
  );
};

export default Profile;
