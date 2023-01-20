import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { setUserInfoToDb, updateProfile } from "../../store/userInfo-slice";

import Avatar from "../Profile/Avatar";
import ErrorModal from "../UI/ErrorModal";
import LoadingSpinner from "../UI/LoadingSpinner";
import styles from "./InitialSettingsPage.module.scss";

const InitialSettingsPage = () => {
  const { token, status, error } = useSelector((state) => state.auth);
  const { userData } = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  const nicknameInput = useRef();
  const navigate = useNavigate();

  const saveNicknameHandler = () => {
    const enteredNickname = nicknameInput.current.value.trim();
    if (enteredNickname.length > 0) {
      dispatch(
        updateProfile({
          type: "nickname",
          token,
          newValue: enteredNickname,
        })
      );
      setUserInfoToDb(userData.localId, enteredNickname, "nickname");
      navigate("/");
      nicknameInput.current.value = "";
    }
  };

  return (
    <ErrorModal isActive={status === "rejected"} errorMessage={error}>
      {status === "pending" ? (
        <LoadingSpinner />
      ) : (
        <section className={styles.initial}>
          <Avatar page="initial-pic" />
          <div className={styles["initial-info"]}>
            <span className={styles.nickname}>
              <label>Имя пользователя:</label>
              <input ref={nicknameInput} type="text" id="set-nickname" />
            </span>
          </div>
          <span onClick={saveNicknameHandler}>Сохранить</span>
        </section>
      )}
    </ErrorModal>
  );
};

export default InitialSettingsPage;
