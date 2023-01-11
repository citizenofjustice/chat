import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";

import {
  authActions,
  logoutUser,
  getTokenHandler,
} from "../../store/auth-slice";
import Button from "../UI/Button";
import styles from "./Header.module.scss";

// custom navLink with path passed through props
const CustomLink = (props) => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    logoutUser();
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
  const [isAuth, setIsAuth] = useState();
  const isTokenAlive = getTokenHandler();

  useEffect(() => {
    setIsAuth(isTokenAlive);
  }, [isTokenAlive]);

  console.log(isAuth);

  // const { isAuth } = useAuth();

  return (
    <nav className={styles.header}>
      <div className={styles.logo}>
        <NavLink to="/">logo</NavLink>
      </div>
      <ul className={styles["nav-links"]}>
        {!isAuth && <CustomLink path="/auth">Вход</CustomLink>}
        {isAuth && <CustomLink path="/profile">Профиль</CustomLink>}
        {isAuth && <CustomLink path="/">Выход</CustomLink>}
      </ul>
    </nav>
  );
};

export default Header;
