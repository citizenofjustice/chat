import { useRef } from "react";
import Avatar from "../Profile/Avatar";
import useAuth from "../../hooks/use-auth";
import { nicknameActions } from "../../store/nickname-slice";
import { useSelector, useDispatch } from "react-redux";
import styles from "./InitialSettingsPage.module.scss";

const InitialSettingsPage = () => {
  const currentIdToken = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const nicknameInput = useRef();
  const { changeNickname } = useAuth();

  const saveNicknameHandler = () => {
    const enteredNickname = nicknameInput.current.value;
    changeNickname(currentIdToken, enteredNickname);
    localStorage.setItem("nick", enteredNickname);
    dispatch(nicknameActions.setNickname({ nick: enteredNickname }));
    nicknameInput.current.value = "";
  };

  return (
    <section className={styles.initial}>
      <Avatar page="initial-pic" />
      <div className={styles["initial-info"]}>
        <span className={styles.nickname}>
          <label>Имя пользователя:</label>
          <input ref={nicknameInput} type="text" id="set-nickname" />
          <button onClick={saveNicknameHandler}>Сохранить</button>
        </span>
      </div>
    </section>
  );
};

export default InitialSettingsPage;
