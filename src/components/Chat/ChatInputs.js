import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { sendMessage } from "../../store/chat-slice";

import ErrorModal from "../UI/ErrorModal";

import sendArrowImg from "../../assets/arrow.svg";
import styles from "./ChatInputs.module.scss";

/**
 * Component responsable for inputting text messages into chat
 * @returns message input form
 */
const ChatInputs = () => {
  const dispatch = useDispatch();
  const messageInput = useRef();

  const { status, error } = useSelector((state) => state.chat);

  /**
   * Function handles submittion of message if enter key was pressed
   * @param {*} event - onKeyUp event
   */
  const enterHandler = (event) => {
    // if Enter was pressed without Shift key submit message
    if (event.key === "Enter" && !event.shiftKey) {
      submitMessageHandler(event);
    }
  };

  /**
   * Function that handles form submittion
   * @param {*} event - form submittion event
   */
  const submitMessageHandler = (event) => {
    event.preventDefault();

    // discard any spaces wrapping the message
    const message = messageInput.current.value.trim();

    // if message field has some text
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
    <ErrorModal isActive={status === "rejected"} errorMessage={error}>
      <form className={styles.inputs} onSubmit={submitMessageHandler}>
        <div className={styles.wrapper}>
          <textarea
            ref={messageInput}
            className={styles["message-field"]}
            onKeyUp={enterHandler}
          />
          <button className={styles.button}>
            <img className={styles.icon} src={sendArrowImg} alt="send-icon" />
          </button>
        </div>
      </form>
    </ErrorModal>
  );
};
export default ChatInputs;
