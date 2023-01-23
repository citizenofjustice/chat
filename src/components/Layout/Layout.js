import { Outlet } from "react-router-dom";
import Navigation from "../Header/Navigation";
import styles from "./Layout.module.scss";

const Layout = () => {
  return (
    <main className={styles.main}>
      <Navigation />
      <Outlet />
    </main>
  );
};

export default Layout;
