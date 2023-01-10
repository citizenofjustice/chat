import Avatar from "./Avatar";
import UserInfo from "./UserInfo";
import styles from "./Profile.module.scss";

const Profile = () => {
  return (
    <section className={styles.profile}>
      <Avatar />
      <UserInfo />
    </section>
  );
};

export default Profile;
