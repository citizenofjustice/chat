import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import useAuth from "../../hooks/use-auth";
import useFirebase from "../../hooks/use-firebase";
import styles from "./EditProfile.module.scss";
import storage from "../../firebase";
import { ref } from "firebase/storage";

const EditProfile = () => {
  const changeNicknameInput = useRef();
  const changeUsernameInput = useRef();
  const changePasswordInput = useRef();
  const currentIdToken = useSelector((state) => state.auth.token);
  const currentUsername = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const { getUserInfo, changeNickname, changeUsername, changePassword } =
    useAuth();
  const { getCurrentPicPath, moveFirebaseFile } = useFirebase();

  const getDataHandler = () => {
    getUserInfo(currentIdToken);
  };

  const changeNicknameHandler = () => {
    const enteredNick = changeNicknameInput.current.value;
    changeNickname(currentIdToken, enteredNick);
    changeNicknameInput.current.value = "";
  };

  const changeUsernameHandler = async () => {
    const enteredUsername = changeUsernameInput.current.value;
    const currentFolderRef = ref(
      storage,
      `${currentUsername}/profile-picture/`
    );
    const currentFilePath = await getCurrentPicPath(currentFolderRef);
    console.log(currentFilePath);
    // const wantedFilePath = ref(
    //   storage,
    //   `${enteredUsername}/profile-picture/${currentFilePath.name}`
    // );
    const wantedFilePath = `${enteredUsername}/profile-picture/${currentFilePath.name}`;
    if (currentUsername !== enteredUsername) {
      changeUsername(currentIdToken, enteredUsername, dispatch);
      moveFirebaseFile(currentFilePath, wantedFilePath);
    } else {
      alert("Введенный логин/почта совпадает с текущим.");
    }
    changeUsernameInput.current.value = "";
  };

  const changePasswordHandler = () => {
    const enteredPassword = changePasswordInput.current.value;
    changePassword(currentIdToken, enteredPassword, dispatch);
    changePasswordInput.current.value = "";
  };

  return (
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
          <input ref={changeUsernameInput} type="email" id="username-change" />
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
      </form>
    </section>
  );
};
export default EditProfile;
