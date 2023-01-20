import { sendMessage } from "../../store/chat-slice";
import { useDispatch } from "react-redux";
import styles from "./ChatInputs.module.scss";
import { useRef } from "react";
import sendArrowImg from "../../assets/arrow.svg";

const ChatInputs = () => {
  const dispatch = useDispatch();
  // const { localId, displayName, photoUrl } = useSelector(
  //   (state) => state.userInfo.userData
  // );
  const messageInput = useRef();

  const enterHandler = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      submitMessageHandler(event);
    }
  };

  const submitMessageHandler = (event) => {
    event.preventDefault();
    const message = messageInput.current.value.trim();
    if (message.length > 0) {
      dispatch(
        sendMessage({
          message: message,
          time: new Date().toISOString(),
        })
      );
      messageInput.current.value = "";
    }
  };

  return (
    <form className={styles.inputs} onSubmit={submitMessageHandler}>
      <textarea
        ref={messageInput}
        className={styles["message-field"]}
        onKeyUp={enterHandler}
      />
      <button className={styles.button}>
        <img className={styles.icon} src={sendArrowImg} alt="send-icon" />
      </button>
    </form>
  );
};
export default ChatInputs;
