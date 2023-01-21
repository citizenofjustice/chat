import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { uiActions } from "../../store/ui-slice";
import styles from "./CustomLink.module.scss";

// custom NavLink/Link with path passed through props
const CustomLink = (props) => {
  const dispatch = useDispatch();
  const { isMenuShown } = useSelector((state) => state.ui);

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
