import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "./Avatar";
import UserInfo from "./UserInfo";

import styles from "./Profile.module.scss";
import { useEffect, useState } from "react";

const Profile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();

  const editLinkChangeHandler = () => {
    setIsEdit((prevState) => !prevState);
  };

  useEffect(() => {
    if (isEdit) {
      navigate("/profile/edit-profile");
    } else navigate("/profile");
  }, [navigate, isEdit]);

  // getting username data from redux
  const user = useSelector((state) => state.auth.user);
  return (
    <section className={styles.profile}>
      <Avatar page="profile-pic" />
      <UserInfo userName={user} />
      <span onClick={editLinkChangeHandler}>
        {isEdit && <Link to="edit-profile">Cancel edit</Link>}
        {!isEdit && <Link to="/profile">Edit</Link>}
      </span>
    </section>
  );
};

export default Profile;
