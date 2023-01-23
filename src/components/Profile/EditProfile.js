import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  changeUsername,
  changePassword,
  updateProfile,
  setUserInfoToDb,
} from "../../store/userInfo-slice";

import ErrorModal from "../UI/ErrorModal";

import styles from "./EditProfile.module.scss";

/**
 * Component for changing user credentials and sending new data to redux, database
 * @returns edit profile form
 */
const EditProfile = () => {
  const dispatch = useDispatch();
  const changeNicknameInput = useRef();
  const changeUsernameInput = useRef();
  const changePasswordInput = useRef();

  // selecting data from redux
  const { token } = useSelector((state) => state.auth);
  const { userData, status, error } = useSelector((state) => state.userInfo);

  /**
   * Function for changing nickname entered by user
   * @param {*} event - onClick event trigered by pressing a button
   * @returns {void}
   */
  const changeNicknameHandler = (event) => {
    event.preventDefault();
    const enteredNickname = changeNicknameInput.current.value.trim();

    // if input field has text
    if (enteredNickname.length > 0) {
      dispatch(
        updateProfile({ type: "nickname", token, newValue: enteredNickname })
      );
      setUserInfoToDb(userData.localId, enteredNickname, "nickname");
      changeNicknameInput.current.value = "";
    }
  };

  /**
   * Function for changing username entered by user
   * @param {*} event - onClick event trigered by pressing a button
   * @returns {void}
   */
  const changeUsernameHandler = (event) => {
    event.preventDefault();
    const enteredUsername = changeUsernameInput.current.value.trim();
    dispatch(changeUsername({ token, enteredUsername }));
    changeUsernameInput.current.value = "";
  };

  /**
   * Function for changing password entered by user
   * @param {*} event - onClick event trigered by pressing a button
   * @returns {void}
   */
  const changePasswordHandler = (event) => {
    event.preventDefault();
    const enteredPassword = changePasswordInput.current.value;
    dispatch(changePassword({ token, enteredPassword }));
    changePasswordInput.current.value = "";
  };

  return (
    <ErrorModal isActive={status === "rejected"} errorMessage={error}>
      <section className={styles["edit-form"]}>
        <form className={styles.form}>
          <div className={styles.changes}>
            <label htmlFor="nickname-change">Никнейм:</label>
            <input ref={changeNicknameInput} type="text" id="nickname-change" />
            <button className={styles.button} onClick={changeNicknameHandler}>
              Поменять
            </button>
          </div>
          <div className={styles.changes}>
            <label htmlFor="username-change">Почта/Логин:</label>
            <input
              ref={changeUsernameInput}
              type="email"
              id="username-change"
            />
            <button className={styles.button} onClick={changeUsernameHandler}>
              Поменять
            </button>
          </div>
          <div className={styles.changes}>
            <label htmlFor="password-change">Пароль: </label>
            <input
              ref={changePasswordInput}
              type="password"
              id="password-change"
            />
            <button className={styles.button} onClick={changePasswordHandler}>
              Поменять
            </button>
          </div>
        </form>
      </section>
    </ErrorModal>
  );
};
export default EditProfile;
