import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Layout from "./components/Layout/Layout";
import AuthPage from "./components/pages/AuthPage";
import ProtectedRoutes from "./components/pages/ProtectedRoutes";
import ProfilePage from "./components/pages/ProfilePage";
import HomePage from "./components/pages/HomePage";
import InitialSettingsPage from "./components/pages/InitialSettingsPage";
import ChatPage from "./components/pages/ChatPage";

import "./styles/reset.module.scss";
import "./styles/variables.module.scss";
import styles from "./styles/app.module.scss";

/**
 * Main application component containing all routes and pages
 * @returns routes and pages components
 */
function App() {
  // Selecting data from redux
  const { token } = useSelector((state) => state.auth);
  const { userData } = useSelector((state) => state.userInfo);

  /**
   * used for authentication status check
   * @constant
   * @type {boolean}
   */
  const isAuth = token !== null;

  /**
   * used for conditional routing if user does not has nickname
   * @constant
   * @type {boolean}
   */
  const hasNick = userData.displayName !== undefined;

  return (
    <div className={styles.container}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />}></Route>
          <Route
            path="auth"
            element={
              <ProtectedRoutes allowed={!isAuth} path="/">
                <AuthPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoutes allowed={isAuth} path="/auth">
                {hasNick && <ProfilePage />}
                {!hasNick && <InitialSettingsPage />}
              </ProtectedRoutes>
            }
          />
          <Route
            path="chat"
            element={
              <ProtectedRoutes allowed={isAuth} path="/auth">
                {hasNick && <ChatPage />}
                {!hasNick && <InitialSettingsPage />}
              </ProtectedRoutes>
            }
          />
          <Route path="*" element={<p>Page not found</p>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
