import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import styles from "./SideMenu.module.scss";
import MenuButton from "./MenuButton";
import { authActions } from "../../store/auth-slice";
import { userInfoActions } from "../../store/userInfo-slice";

const CustomLink = (props) => {
  const dispatch = useDispatch();

  const closeMenuHandler = () => {
    dispatch(uiActions.toggleMenu());
  };

  return (
    <li onClick={closeMenuHandler} className={styles[props.classText]}>
      {props.isNav ? (
        <NavLink
          className={(navData) => (navData.isActive ? styles.active : "")}
          to={props.path}
        >
          {props.children}
        </NavLink>
      ) : (
        <Link to={props.path}>{props.children}</Link>
      )}
    </li>
  );
};

const SideMenu = (props) => {
  const isAuth = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    if (props.logoutTimer) {
      clearTimeout(props.logoutTimer);
      dispatch(authActions.logout());
      dispatch(userInfoActions.clearUserInfo());
    }
  };

  return (
    <nav
      className={`${styles["side-nav"]} ${props.isActive && styles["active"]}`}
    >
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
            <CustomLink onClick={logoutHandler} classText="menu-item" path="/">
              Выход
            </CustomLink>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default SideMenu;
