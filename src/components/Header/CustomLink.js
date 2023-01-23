import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

import { uiActions } from "../../store/ui-slice";

import styles from "./CustomLink.module.scss";

// custom NavLink/Link with path passed through props

/**
 * Custom component used for conditional renering of Router's Link/NavLink
 * @param {string} props.path - contains wanted path, where user would be sent
 * @param {boolean} props.isNav - tells us if this should be Link or NavLink
 * @param {*} props.logout - prop for triggerring logoutHandler function
 * @param {string} props.children - contains wanted link's name
 * @returns navigation link
 */
const CustomLink = (props) => {
  const dispatch = useDispatch();
  // selecting state for showing/hiding SideMenu
  const { isMenuShown } = useSelector((state) => state.ui);

  /**
   * function that handles SideMenu toggling
   * @returns {void}
   */
  const closeSideMenuHandler = () => {
    if (isMenuShown) {
      dispatch(uiActions.toggleMenu());
    }
  };

  return (
    <li
      onClick={closeSideMenuHandler}
      key={props.path}
      className={styles["menu-item"]}
    >
      {props.isNav === true ? (
        <NavLink
          to={props.path}
          className={(navData) => (navData.isActive ? styles.active : "")}
        >
          {props.children}
        </NavLink>
      ) : (
        <Link onClick={props.logout} to={props.path}>
          {props.children}
        </Link>
      )}
    </li>
  );
};

export default CustomLink;
