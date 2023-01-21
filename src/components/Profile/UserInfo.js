import styles from "./UserInfo.module.scss";
import { useSelector } from "react-redux";

const UserInfo = (props) => {
  const { userData } = useSelector((state) => state.userInfo);
  const dateObj = new Date(+userData.createdAt);
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
          <p className={styles["word-brake"]}>{props.email}</p>
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
