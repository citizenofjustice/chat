import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth-slice";
import { NavLink } from "react-router-dom";

import Button from "../UI/Button";
import styles from "./Header.module.scss";

// custom navLink with path passed through props
const CustomLink = (props) => {
  return (
    <li className={styles.link}>
      <Button type="green">
        <NavLink
          onClick={props.onClick}
          className={(navData) => (navData.isActive ? styles.active : "")}
          to={props.path}
        >
          {props.children}
        </NavLink>
      </Button>
    </li>
  );
};

const Header = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const isAuth = !!user;

  const logoutHandler = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    dispatch(authActions.logout());
  };

  return (
    <nav className={styles.header}>
      <div className={styles.logo}>
        <NavLink to="/">logo</NavLink>
      </div>
      <ul className={styles["nav-links"]}>
        {!isAuth && <CustomLink path="/auth">Вход</CustomLink>}
        {isAuth && <CustomLink path="/profile">Профиль</CustomLink>}
        {isAuth && (
          <CustomLink path="/" onClick={logoutHandler}>
            Выход
          </CustomLink>
        )}
      </ul>
    </nav>
  );
};

export default Header;
