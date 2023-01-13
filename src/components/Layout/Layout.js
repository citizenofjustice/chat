import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

const Layout = () => {
  return (
    <>
      <Header />
      <main style={{ margin: "0 auto" }}>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
