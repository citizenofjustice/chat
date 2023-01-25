import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { setUserInfoToDb, updateProfile } from "../../store/userInfo-slice";

import Avatar from "../Profile/Avatar";
import ErrorModal from "../UI/ErrorModal";
import LoadingSpinner from "../UI/LoadingSpinner";

import styles from "./InitialSettingsPage.module.scss";

/**
 * Initial settings page, where user needs to choose nickname
 * @returns Initial settings page
 */
const InitialSettingsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const nicknameInput = useRef();

  // selecting data from redux
  const { token, status, error } = useSelector((state) => state.auth);
  const { userData } = useSelector((state) => state.userInfo);

  /**
   * Function that saves entered nickname
   * @param {*} event - onClick event, when user clicks on button
   */
  const saveNicknameHandler = (event) => {
    event.preventDefault();
    const enteredNickname = nicknameInput.current.value.trim();

    // if input field has some text
    if (enteredNickname.length > 0) {
      // saving nickname to redux
      dispatch(
        updateProfile({
          type: "nickname",
          token,
          newValue: enteredNickname,
        })
      );
      // setting nickname data to database
      setUserInfoToDb(userData.localId, enteredNickname, "nickname");
      nicknameInput.current.value = "";

      // navigating to a homepage
      navigate("/");
    }
  };

  return (
    <ErrorModal isActive={status === "rejected"} errorMessage={error}>
      {status === "pending" ? (
        <LoadingSpinner />
      ) : (
        <section className={styles.initial}>
          <p className={styles.title}>Инициализация профиля:</p>
          <Avatar page="initial-pic" />
          <form className={styles["initial-info"]}>
            <span className={styles.nickname}>
              <label>Введите имя пользователя:</label>
              <input
                autoFocus
                ref={nicknameInput}
                type="text"
                id="set-nickname"
              />
            </span>
            <button className={styles.button} onClick={saveNicknameHandler}>
              Готово
            </button>
          </form>
        </section>
      )}
    </ErrorModal>
  );
};

export default InitialSettingsPage;
