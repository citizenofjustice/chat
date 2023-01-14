import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import {
  authActions,
  calcRemainingTime,
  retriveAuthStorageData,
} from "../../store/auth-slice";
import { nicknameActions } from "../../store/nickname-slice";

import Button from "../UI/Button";
import styles from "./Header.module.scss";

// variable that storing timeout and clearing it when time runs out
let logoutTimer;

const Header = () => {
  // getting data from localStorage
  const storageData = retriveAuthStorageData();
  // const nick = useSelector((state) => state.nick.nick);
  const isAuth = !!storageData;
  // const hasNickname = !isAuth && !nick;
  const dispatch = useDispatch();

  // function that handles user logout
  const logoutHandler = useCallback(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");

    // if timer exist clear it
    if (logoutTimer) {
      clearTimeout(logoutTimer);
      dispatch(authActions.logout());
      dispatch(nicknameActions.clearNickname());
    }
  }, [dispatch]);

  // function that updates local storage
  const setLocalStorageHandler = useCallback(
    (user, token, expirationTime) => {
      localStorage.setItem("user", user);
      localStorage.setItem("token", token);
      localStorage.setItem("expirationTime", expirationTime);

      const remainingTime = calcRemainingTime(expirationTime);

      logoutTimer = setTimeout(() => {
        logoutHandler();
      }, remainingTime);
    },
    [logoutHandler]
  );

  // if we store auth data in localstorage set tokens lifespan
  useEffect(() => {
    if (storageData) {
      const { user, token, duration } = storageData;
      const expirationTime = new Date(new Date().getTime() + duration);
      logoutTimer = setTimeout(() => {
        setLocalStorageHandler(user, token, expirationTime);
      }, duration);
    }
  }, [setLocalStorageHandler, storageData]);

  return (
    <nav className={styles.header}>
      <div className={styles.logo}>
        <NavLink to="/">logo</NavLink>
      </div>
      <ul className={styles["nav-links"]}>
        {!isAuth && <CustomLink path="/auth">Вход</CustomLink>}
        {isAuth && <CustomLink path="/profile">Профиль</CustomLink>}
        {/* <CustomLink path="/profile/settings">Инициализация</CustomLink> */}
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
