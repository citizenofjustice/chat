import { useSelector } from "react-redux";

import styles from "./UserInfo.module.scss";

/**
 * Components that renders user info
 * @returns user info
 */
const UserInfo = () => {
  // getting user data from redux
  const { userData } = useSelector((state) => state.userInfo);

  // converting date in string format to a date object
  const dateObj = new Date(+userData.createdAt);
  // converting date to a locale string
  const creationDate = dateObj.toLocaleString();

  return (
    <div className={styles["user-info"]}>
      <div className={styles.title}>
        Здарвствуйте,&nbsp;
        <p className={styles.username}>{userData.displayName}</p>
      </div>
      <ul className={styles.info}>
        <li className={styles["info-item"]}>
          <p className={styles.subtitle}>Электронная почта:</p>
          <p className={styles["word-brake"]}>{userData.email}</p>
        </li>
        <li className={styles["info-item"]}>
          <p className={styles.subtitle}>Зарегистрирован:</p>
          <p>{creationDate}</p>
        </li>
      </ul>
    </div>
  );
};

export default UserInfo;
