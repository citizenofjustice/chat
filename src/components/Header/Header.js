import { NavLink } from "react-router-dom";

import styles from "./Header.module.scss";

// custom navLink with path passed through props
const CustomLink = (props) => {
  return (
    <li className={styles.link}>
      <NavLink
        className={(navData) => (navData.isPending ? styles.active : "")}
        to={props.path}
      >
        <div className={styles.button}>{props.children}</div>
      </NavLink>
    </li>
  );
};

const Header = () => {
  return (
    <nav className={styles.header}>
      <NavLink to="/">
        <div className={styles.logo}>logo</div>
      </NavLink>
      <ul className={styles["nav-links"]}>
        <CustomLink path="/auth">sign in</CustomLink>
        <CustomLink path="/profile">profile</CustomLink>
        <CustomLink path="/">logout</CustomLink>
      </ul>
    </nav>
  );
};

export default Header;
