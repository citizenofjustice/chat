import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import styles from "./SideMenu.module.scss";
import MenuButton from "./MenuButton";

const ListItem = (props) => {
  const dispatch = useDispatch();

  const closeMenuHandler = () => {
    dispatch(uiActions.toggleMenu());
  };

  return (
    <li onClick={closeMenuHandler} className={styles[props.classText]}>
      <Link to={props.path}>{props.children}</Link>
    </li>
  );
};

const SideMenu = (props) => {
  const isAuth = useSelector((state) => state.auth.user);
  return (
    <nav
      className={`${styles["side-nav"]} ${props.isActive && styles["active"]}`}
    >
      <div className={styles["menu-wrapper"]}>
        <ul className={styles["side-menu"]}>
          <ListItem classText="menu-item" path="/">
            Главная страница
          </ListItem>
          {!isAuth && (
            <ListItem classText="menu-item" path="/auth">
              Вход
            </ListItem>
          )}
          {isAuth && (
            <ListItem classText="menu-item" path="/chat">
              Чат
            </ListItem>
          )}
          {isAuth && (
            <ListItem classText="menu-item" path="/profile">
              Профиль
            </ListItem>
          )}
          {isAuth && (
            <ListItem classText="menu-item" path="/">
              Выход
            </ListItem>
          )}
        </ul>
        <MenuButton />
      </div>
    </nav>
  );
};

export default SideMenu;
