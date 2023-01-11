import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import AuthPage from "./components/pages/AuthPage";
import ProfilePage from "./components/pages/ProfilePage";
import HomePage from "./components/pages/HomePage";
import { useAuth } from "./hooks/use-auth";
import { getTokenHandler } from "./store/auth-slice";

import "./styles/reset.module.scss";
import "./styles/variables.module.scss";
import styles from "./styles/app.module.scss";

function App() {
  const isTokenAlive = getTokenHandler();
  // const { isAuth } = useAuth();

  return (
    <div className={styles.container}>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/auth" element={<AuthPage />}></Route>
          <Route
            path="/profile"
            element={
              isTokenAlive ? <ProfilePage /> : <Navigate to="/" replace />
              // </ProtectedRoutes>
            }
          ></Route>
          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
