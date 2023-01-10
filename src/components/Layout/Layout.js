import Header from "../Header/Header";

const Layout = (props) => {
  return (
    <>
      <Header />
      <main style={{ margin: "0 auto" }}>{props.children}</main>
    </>
  );
};

export default Layout;
