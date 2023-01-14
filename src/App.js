import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Layout from "./components/Layout/Layout";
import AuthPage from "./components/pages/AuthPage";
import ProfilePage from "./components/pages/ProfilePage";
import HomePage from "./components/pages/HomePage";
import InitialSettingsPage from "./components/pages/InitialSettingsPage";
import EditProfile from "./components/Profile/EditProfile";

import "./styles/reset.module.scss";
import "./styles/variables.module.scss";
import styles from "./styles/app.module.scss";

function App() {
  // checking if user is authenticated
  const user = useSelector((state) => state.auth.user);
  const isAuth = !!user;

  return (
    <div className={styles.container}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />}></Route>
          <Route path="auth" element={<AuthPage />} />
          <Route
            path="profile"
            element={isAuth ? <ProfilePage /> : <Navigate to="/" replace />}
          >
            <Route path="edit-profile" element={<EditProfile />} />
          </Route>
          <Route path="profile/settings" element={<InitialSettingsPage />} />
          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
