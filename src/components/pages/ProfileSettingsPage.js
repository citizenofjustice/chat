import { useRef } from "react";
import Avatar from "../Profile/Avatar";
import useAuth from "../../hooks/use-auth";
import { useSelector } from "react-redux";

const ProfileSettingsPage = () => {
  const currentIdToken = useSelector((state) => state.auth.token);
  const nicknameInput = useRef();
  const { changeNickname } = useAuth();

  const saveNicknameHandler = () => {
    const enteredNickname = nicknameInput.current.value;
    changeNickname(currentIdToken, enteredNickname);
    nicknameInput.current.value = "";
  };

  return (
    <>
      <Avatar />
      <div>
        <span>
          <label>Имя пользователя:</label>
          <input ref={nicknameInput} type="text" id="set-nickname" />
          <button onClick={saveNicknameHandler}>Сохранить</button>
        </span>
      </div>
    </>
  );
};

export default ProfileSettingsPage;
