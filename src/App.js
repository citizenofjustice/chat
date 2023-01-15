import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Layout from "./components/Layout/Layout";
import AuthPage from "./components/pages/AuthPage";
import ProfilePage from "./components/pages/ProfilePage";
import HomePage from "./components/pages/HomePage";
import InitialSettingsPage from "./components/pages/InitialSettingsPage";
import EditProfile from "./components/Profile/EditProfile";
import ProtectedRoutes from "./ProtectedRoutes";

import "./styles/reset.module.scss";
import "./styles/variables.module.scss";
import styles from "./styles/app.module.scss";

function App() {
  // checking if user is authenticated
  const user = useSelector((state) => state.auth.user);
  const nick = useSelector((state) => state.nick.nick);
  const isAuth = !!user;

  console.log("user", user);
  console.log("isAuth", isAuth);

  return (
    <div className={styles.container}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />}></Route>
          <Route path="auth" element={<AuthPage />} />
          <Route
            path="profile"
            element={
              <ProtectedRoutes allowed={isAuth} path="/auth">
                {nick && <ProfilePage />}
                {!nick && <InitialSettingsPage />}
              </ProtectedRoutes>
            }
          >
            <Route path="edit-profile" element={<EditProfile />} />
          </Route>
          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
