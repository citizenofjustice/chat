import { useSelector } from "react-redux";

import CustomLink from "./CustomLink";
import MenuButton from "../UI/MenuButton";

import styles from "./SideMenu.module.scss";

/**
 * Component displaying side menu
 * @param {*} props.onLogout - contains link to a function (logoutHandler)
 * @param {*} props.isAuth - contains current authentication status
 * @returns side menu
 */
const SideMenu = (props) => {
  // selecting menu toggling status for changing className conditionally
  const { isMenuShown } = useSelector((state) => state.ui);

  return (
    <nav className={`${styles["side-nav"]} ${isMenuShown && styles["active"]}`}>
      <div className={styles["menu-wrapper"]}>
        <div className={styles.burger}>
          <MenuButton />
        </div>
        <ul className={styles["side-menu"]}>
          <CustomLink classText="menu-item" path="/">
            Главная страница
          </CustomLink>
          {!props.isAuth && (
            <CustomLink classText="menu-item" path="/auth">
              Вход
            </CustomLink>
          )}
          {props.isAuth && (
            <CustomLink isNav={true} classText="menu-item" path="/chat">
              Чат
            </CustomLink>
          )}
          {props.isAuth && (
            <CustomLink isNav={true} classText="menu-item" path="/profile">
              Профиль
            </CustomLink>
          )}
          {props.isAuth && (
            <CustomLink logout={props.onLogout} classText="menu-item" path="/">
              Выход
            </CustomLink>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default SideMenu;
