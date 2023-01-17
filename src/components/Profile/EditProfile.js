import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  getUserInfo,
  changeUsername,
  changePassword,
  updateProfile,
} from "../../store/userInfo-slice";

import ErrorModal from "../UI/ErrorModal";
import styles from "./EditProfile.module.scss";

const EditProfile = () => {
  const dispatch = useDispatch();

  const { user, token, status, error } = useSelector((state) => state.auth);

  const changeNicknameInput = useRef();
  const changeUsernameInput = useRef();
  const changePasswordInput = useRef();

  const getDataHandler = () => {
    dispatch(getUserInfo(token));
  };

  const changeNicknameHandler = () => {
    const enteredNick = changeNicknameInput.current.value;
    dispatch(updateProfile({ type: "nickname", token, newValue: enteredNick }));
    changeNicknameInput.current.value = "";
  };

  const changeUsernameHandler = async () => {
    const enteredUsername = changeUsernameInput.current.value;
    if (user !== enteredUsername) {
      dispatch(changeUsername({ token, enteredUsername }));
      changeUsernameInput.current.value = "";
    } else {
      alert("Введенный логин/почта совпадает с текущим.");
    }
  };

  const changePasswordHandler = () => {
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
            <span className={styles.button} onClick={changeNicknameHandler}>
              Поменять
            </span>
          </div>
          <div className={styles.changes}>
            <label htmlFor="username-change">Почта/Логин:</label>
            <input
              ref={changeUsernameInput}
              type="email"
              id="username-change"
            />
            <span className={styles.button} onClick={changeUsernameHandler}>
              Поменять
            </span>
          </div>
          <div className={styles.changes}>
            <label htmlFor="password-change">Пароль: </label>
            <input
              ref={changePasswordInput}
              type="password"
              id="password-change"
            />
            <span className={styles.button} onClick={changePasswordHandler}>
              Поменять
            </span>
          </div>
          <span className={styles.button} onClick={getDataHandler}>
            Получить данные
          </span>
          {status === "pending" && <h2>Loading...</h2>}
        </form>
      </section>
    </ErrorModal>
  );
};
export default EditProfile;
