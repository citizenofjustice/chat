import { sendMessage } from "../../store/chat-slice";
import { useDispatch } from "react-redux";
import styles from "./ChatInputs.module.scss";
import { useRef } from "react";

const ChatInputs = (props) => {
  const dispatch = useDispatch();
  // const { status, error } = useSelector((state) => state.chat);
  const messageInput = useRef();

  const submitMessageHandler = (event) => {
    event.preventDefault();
    const message = messageInput.current.value;
    if (message !== "") {
      dispatch(
        sendMessage({
          userId: props.userId,
          message,
          time: new Date().toISOString(),
        })
      );
      //   setMessages([...messages, newMessage]);
      props.onAdditon(true);
      messageInput.current.value = "";
    }
  };
  return (
    <form className={styles.inputs} onSubmit={submitMessageHandler}>
      <textarea ref={messageInput} className={styles["message-field"]} />
      <span className={styles.button}>
        <button>Отправить</button>
      </span>
    </form>
  );
};
export default ChatInputs;
