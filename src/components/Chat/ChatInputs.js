import { sendMessage } from "../../store/chat-slice";
import { useDispatch } from "react-redux";
import styles from "./ChatInputs.module.scss";
import { useRef } from "react";

const ChatInputs = (props) => {
  const dispatch = useDispatch();
  // const { status, error } = useSelector((state) => state.chat);
  const messageInput = useRef();

  const enterHandler = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      submitMessageHandler(event);
    }
  };

  const submitMessageHandler = (event) => {
    event.preventDefault();
    const message = messageInput.current.value;
    if (message.trim().length > 0) {
      console.log(message);
      dispatch(
        sendMessage({
          message: message.trim(),
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
      <span className={styles.button}>
        <button>Отправить</button>
      </span>
    </form>
  );
};
export default ChatInputs;
