import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { authActions, calcRemainingTime } from "../../store/auth-slice";
import { userInfoActions } from "../../store/userInfo-slice";

import Button from "../UI/Button";
import styles from "./Header.module.scss";

// variable that storing timeout and clearing it when time runs out
let logoutTimer;

const Header = () => {
  // getting data from localStorage
  const { user, expirationTime } = useSelector((state) => state.auth);
  // const storageData = retriveAuthStorageData();
  const isAuth = !!user;
  const dispatch = useDispatch();

  // function that handles user logout
  const logoutHandler = useCallback(() => {
    // if timer exist clear it
    if (logoutTimer) {
      clearTimeout(logoutTimer);
      dispatch(authActions.logout());
      dispatch(userInfoActions.clearUserInfo());
    }
  }, [dispatch]);

  useEffect(() => {
    console.log(expirationTime);
    if (!!expirationTime) {
      const duration = calcRemainingTime(expirationTime);
      clearTimeout(logoutTimer);
      logoutTimer = setTimeout(() => {
        logoutHandler();
      }, duration);
    }
  }, [expirationTime, logoutHandler]);

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

export default Header;
