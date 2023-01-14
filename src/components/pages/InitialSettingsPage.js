import { useRef } from "react";
import Avatar from "../Profile/Avatar";
import useAuth from "../../hooks/use-auth";
import { nicknameActions } from "../../store/nickname-slice";
import { useSelector, useDispatch } from "react-redux";

const InitialSettingsPage = () => {
  const currentIdToken = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const nicknameInput = useRef();
  const { changeNickname } = useAuth();

  const saveNicknameHandler = () => {
    const enteredNickname = nicknameInput.current.value;
    changeNickname(currentIdToken, enteredNickname);
    dispatch(nicknameActions.setNickname({ nick: enteredNickname }));
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

export default InitialSettingsPage;
