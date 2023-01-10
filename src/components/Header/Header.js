import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";

import { authActions } from "../../store/auth-slice";
import Button from "../UI/Button";
import styles from "./Header.module.scss";

// custom navLink with path passed through props
const CustomLink = (props) => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  return (
    <li className={styles.link}>
      <Button type="green">
        <NavLink
          onClick={logoutHandler}
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
  const isLoggedIn = useSelector((state) => state.auth.userIsLoggedIn);

  return (
    <nav className={styles.header}>
      <div className={styles.logo}>
        <NavLink to="/">logo</NavLink>
      </div>
      <ul className={styles["nav-links"]}>
        {!isLoggedIn && <CustomLink path="/auth">Вход</CustomLink>}
        {isLoggedIn && <CustomLink path="/profile">Профиль</CustomLink>}
        {isLoggedIn && <CustomLink path="/">Выход</CustomLink>}
      </ul>
    </nav>
  );
};

export default Header;
