import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import "./styles/reset.module.scss";
import "./styles/variables.module.scss";
import styles from "./styles/app.module.scss";
import AuthPage from "./components/pages/AuthPage";
import ProfilePage from "./components/pages/ProfilePage";
import HomePage from "./components/pages/HomePage";

function App() {
  return (
    <div className={styles.container}>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/auth" element={<AuthPage />}></Route>
          <Route path="/profile" element={<ProfilePage />}></Route>
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
