import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import UserInfo from "./UserInfo";

import styles from "./Profile.module.scss";
import { useState } from "react";

const Profile = () => {
  const [isEdit, setIsEdit] = useState(true);

  const editLinkChangeHandler = () => {
    setIsEdit((prevState) => !prevState);
  };

  // getting username data from redux
  const user = useSelector((state) => state.auth.user);
  return (
    <section className={styles.profile}>
      <Avatar page="profile-pic" />
      <UserInfo userName={user} />
      <span onClick={editLinkChangeHandler}>
        {isEdit && <Link to="edit-profile">Edit</Link>}
        {!isEdit && <Link to="/profile">Cancel edit</Link>}
      </span>
    </section>
  );
};

export default Profile;
