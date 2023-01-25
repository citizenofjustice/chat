import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { authActions, calcRemainingTime } from "../../store/auth-slice";
import { userInfoActions } from "../../store/userInfo-slice";

import SideMenu from "./SideMenu";
import RegularMenu from "./RegularMenu";
import MenuButton from "../UI/MenuButton";

import logoImg from "../../assets/logo.png";
import styles from "./Navigation.module.scss";

// variable for storing timeout and clearing it when time runs out
let logoutTimer;

/**
 * Comonent responsable for user navigation across the app
 * @returns navigation panel/menu
 */
const Navigation = () => {
  const dispatch = useDispatch();

  // selecting the token from redux, to be certian that user is authentickated
  const isAuth = useSelector((state) => state.auth.token);

  // selecting time of token expiration from redux
  const { expirationTime } = useSelector((state) => state.auth);

  // Callback function that handles user logout
  const logoutHandler = useCallback(() => {
    if (logoutTimer) {
      // if timer exist clear it
      clearTimeout(logoutTimer);
      // clear redux states
      dispatch(authActions.logout());
      dispatch(userInfoActions.clearUserInfo());
    }
  }, [dispatch]);

  // useEffect for triggerring token expiration calculaions
  useEffect(() => {
    if (!!expirationTime) {
      // format string into number of miliseconds
      const duration = calcRemainingTime(expirationTime);
      clearTimeout(logoutTimer);
      // set timer
      logoutTimer = setTimeout(() => {
        logoutHandler();
      }, duration);
    }
  }, [expirationTime, logoutHandler]);

  return (
    <>
      <nav className={styles.header}>
        <div className={styles.logo}>
          <Link to="/">
            <img src={logoImg} alt="logo" />
          </Link>
        </div>
        <RegularMenu isAuth={isAuth} onLogout={logoutHandler} />
        <MenuButton />
      </nav>
      <SideMenu isAuth={isAuth} onLogout={logoutHandler} />
    </>
  );
};

export default Navigation;
