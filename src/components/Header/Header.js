import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import {
  authActions,
  calcRemainingTime,
  retriveAuthStorageData,
} from "../../store/auth-slice";
import { timerActions } from "../../store/timer-slice";

import Button from "../UI/Button";
import styles from "./Header.module.scss";

// variable that storing timeout and clearing it when time runs out
let logoutTimer;

const Header = () => {
  // getting data from localStorage
  const storageData = retriveAuthStorageData();

  // getting timer data from redux
  const time = useSelector((state) => state.timer);
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
      dispatch(timerActions.clearTimer());
    }
  }, [dispatch]);

  // function that updates local storage
  const setLocalStorageHandler = useCallback(
    (user, token, expirationTime) => {
      localStorage.setItem("user", user);
      localStorage.setItem("token", token);
      localStorage.setItem("expirationTime", expirationTime);

      const remainingTime = calcRemainingTime(expirationTime);

      dispatch(timerActions.setTimer(remainingTime));

      logoutTimer = setTimeout(() => {
        logoutHandler();
      }, remainingTime);
    },
    [dispatch, logoutHandler]
  );

  // if we store auth data in localstorage set tokens lifespan
  useEffect(() => {
    if (storageData) {
      const { timer } = time;
      const { user, token, duration } = storageData;
      const expirationTime = new Date(new Date().getTime() + duration);
      logoutTimer = setTimeout(() => {
        setLocalStorageHandler(user, token, expirationTime);
      }, timer);
    }
  }, [time, setLocalStorageHandler, storageData]);

  return (
    <nav className={styles.header}>
      <div className={styles.logo}>
        <NavLink to="/">logo</NavLink>
      </div>
      <ul className={styles["nav-links"]}>
        {!storageData && <CustomLink path="/auth">Вход</CustomLink>}
        {!!storageData && <CustomLink path="/profile">Профиль</CustomLink>}
        {!!storageData && (
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
