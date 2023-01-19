import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import styles from "./Layout.module.scss";

const Layout = () => {
  return (
    <main className={styles.main}>
      <Header />
      <Outlet />
    </main>
  );
};

export default Layout;
