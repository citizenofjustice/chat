import CustomLink from "./CustomLink";

import styles from "./RegularMenu.module.scss";

/**
 * Component displaying navigation panel at the top of the app
 * @param {*} props.onLogout - contains link to a function (logoutHandler)
 * @param {*} props.isAuth - contains current authentication status
 * @returns navigation panel
 */
const RegularMenu = (props) => {
  return (
    <div className={styles["menu-wrapper"]}>
      <ul className={styles["nav-links"]}>
        {!props.isAuth && <CustomLink path="/auth">Вход</CustomLink>}
        {props.isAuth && (
          <CustomLink isNav={true} path="/chat">
            Чат
          </CustomLink>
        )}
        {props.isAuth && (
          <CustomLink isNav={true} path="/profile">
            Профиль
          </CustomLink>
        )}
        {props.isAuth && (
          <CustomLink logout={props.onLogout} path="/">
            Выход
          </CustomLink>
        )}
      </ul>
    </div>
  );
};

export default RegularMenu;
