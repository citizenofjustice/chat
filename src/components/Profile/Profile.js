import { useState } from "react";

import Avatar from "./Avatar";
import UserInfo from "./UserInfo";
import EditProfile from "./EditProfile";

import styles from "./Profile.module.scss";

/**
 * Component that renders user profile element (avatar, user info, edit form)
 * @returns user profile
 */
const Profile = () => {
  // defining state for changing and displaying link name accordingly
  const [isEdit, setIsEdit] = useState(false);

  /**
   * function that handles edit form toggle
   * @returns {void}
   */
  const editLinkChangeHandler = () => {
    setIsEdit((prevState) => !prevState);
  };

  return (
    <section className={styles.profile}>
      <Avatar page="profile-pic" />
      <UserInfo />
      <span className={styles.button} onClick={editLinkChangeHandler}>
        {isEdit ? "Скрыть" : "Редактировать данные"}
      </span>
      {isEdit && <EditProfile />}
    </section>
  );
};

export default Profile;
