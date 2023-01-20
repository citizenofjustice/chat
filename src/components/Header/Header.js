import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";

import { authActions, calcRemainingTime } from "../../store/auth-slice";
import { userInfoActions } from "../../store/userInfo-slice";

import Button from "../UI/Button";
import MenuButton from "../UI/MenuButton";
import SideMenu from "../UI/SideMenu";
import logoImg from "../../assets/logo.png";
import styles from "./Header.module.scss";

// variable that storing timeout and clearing it when time runs out
let logoutTimer;

const Header = () => {
  // getting data from localStorage
  const { user, expirationTime } = useSelector((state) => state.auth);
  const { isMenuShown } = useSelector((state) => state.ui);
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
        <ul className={styles["nav-links"]}>
          {!isAuth && <CustomLink path="/auth">Вход</CustomLink>}
          {isAuth && (
            <CustomLink isNav={true} path="/chat">
              Чат
            </CustomLink>
          )}
          {isAuth && (
            <CustomLink isNav={true} path="/profile">
              Профиль
            </CustomLink>
          )}
          {isAuth && (
            <CustomLink path="/" onClick={logoutHandler}>
              Выход
            </CustomLink>
          )}
        </ul>
        <MenuButton />
      </nav>
      <SideMenu isActive={isMenuShown} />
    </>
  );
};

// custom navLink with path passed through props
const CustomLink = (props) => {
  return (
    <li key={props.path} className={styles.link}>
      <Button type="green">
        {props.isNav === true ? (
          <NavLink
            onClick={props.onClick}
            to={props.path}
            className={(navData) => (navData.isActive ? styles.active : "")}
          >
            {props.children}
          </NavLink>
        ) : (
          <Link onClick={props.onClick} to={props.path}>
            {props.children}
          </Link>
        )}
      </Button>
    </li>
  );
};

export default Header;
