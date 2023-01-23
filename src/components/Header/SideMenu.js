import { useSelector } from "react-redux";

import CustomLink from "./CustomLink";
import MenuButton from "../UI/MenuButton";
import styles from "./SideMenu.module.scss";

const SideMenu = (props) => {
  const isAuth = useSelector((state) => state.auth.user);
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
          {!isAuth && (
            <CustomLink classText="menu-item" path="/auth">
              Вход
            </CustomLink>
          )}
          {isAuth && (
            <CustomLink isNav={true} classText="menu-item" path="/chat">
              Чат
            </CustomLink>
          )}
          {isAuth && (
            <CustomLink isNav={true} classText="menu-item" path="/profile">
              Профиль
            </CustomLink>
          )}
          {isAuth && (
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
