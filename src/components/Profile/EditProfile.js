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

const EditProfile = () => {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { userData, status, error } = useSelector((state) => state.userInfo);
  const changeNicknameInput = useRef();
  const changeUsernameInput = useRef();
  const changePasswordInput = useRef();

  const changeNicknameHandler = () => {
    const enteredNickname = changeNicknameInput.current.value.trim();
    if (enteredNickname.length > 0) {
      dispatch(
        updateProfile({ type: "nickname", token, newValue: enteredNickname })
      );
      setUserInfoToDb(userData.localId, enteredNickname, "nickname");
      changeNicknameInput.current.value = "";
    }
  };

  const changeUsernameHandler = async () => {
    const enteredUsername = changeUsernameInput.current.value.trim();
    dispatch(changeUsername({ token, enteredUsername }));
    changeUsernameInput.current.value = "";
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
        </form>
      </section>
    </ErrorModal>
  );
};
export default EditProfile;
