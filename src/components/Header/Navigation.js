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

// variable that storing timeout and clearing it when time runs out
let logoutTimer;

const Navigation = () => {
  // getting data from localStorage
  const { expirationTime } = useSelector((state) => state.auth);

  // const storageData = retriveAuthStorageData();

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
    if (!!expirationTime) {
      const duration = calcRemainingTime(expirationTime);
      clearTimeout(logoutTimer);
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
        <RegularMenu onLogout={logoutHandler} />
        <MenuButton />
      </nav>
      <SideMenu onLogout={logoutHandler} />
    </>
  );
};

export default Navigation;
