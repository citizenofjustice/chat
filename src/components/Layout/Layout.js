import { Outlet } from "react-router-dom";

import Navigation from "../Header/Navigation";

import styles from "./Layout.module.scss";

/**
 * Component for correct conditional routing, always keeps navigation in
 * @returns layout of page
 */
const Layout = () => {
  return (
    <main className={styles.main}>
      <Navigation />
      <Outlet />
    </main>
  );
};

export default Layout;
