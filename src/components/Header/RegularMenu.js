import { useSelector } from "react-redux";

import CustomLink from "./CustomLink";
import styles from "./RegularMenu.module.scss";

const RegularMenu = (props) => {
  const isAuth = useSelector((state) => state.auth.user);

  return (
    <div className={styles["menu-wrapper"]}>
      <ul className={styles["nav-links"]}>
        {!isAuth && <CustomLink path="/auth">Вход</CustomLink>}
        {isAuth && (
          <CustomLink isNav={true} path="/chat">
            Чат
          </CustomLink>
        )}
        {isAuth && (
          <CustomLink isNav={true} path="/profile">
            Профиль
          </CustomLink>
        )}
        {isAuth && (
          <CustomLink logout={props.onLogout} path="/">
            Выход
          </CustomLink>
        )}
      </ul>
    </div>
  );
};

export default RegularMenu;
