import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Avatar from "./Avatar";
import UserInfo from "./UserInfo";
import styles from "./Profile.module.scss";

const Profile = () => {
  // getting username data from redux
  const user = useSelector((state) => state.auth.user);

  const navigate = useNavigate();

  const [isEdit, setIsEdit] = useState(false);

  const editLinkChangeHandler = () => {
    setIsEdit((prevState) => !prevState);
  };

  useEffect(() => {
    if (isEdit) {
      navigate("/profile/edit-profile");
    } else navigate("/profile");
  }, [navigate, isEdit]);

  return (
    <section className={styles.profile}>
      <Avatar page="profile-pic" />
      <UserInfo email={user} />
      <span className={styles.button} onClick={editLinkChangeHandler}>
        {isEdit && <Link to="edit-profile">Скрыть</Link>}
        {!isEdit && <Link to="/profile">Редактировать данные</Link>}
      </span>
    </section>
  );
};

export default Profile;
