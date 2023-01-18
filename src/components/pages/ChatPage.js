import { useSelector } from "react-redux";

import styles from "./ChatPage.module.scss";

import ErrorModal from "../UI/ErrorModal";
import ChatInputs from "../Chat/ChatInputs";
import ChatMessages from "../Chat/ChatMessages";

const ChatPage = () => {
  const { messages, status, error } = useSelector((state) => state.chat);
  const { userData } = useSelector((state) => state.userInfo);
  const { localId } = userData;

  return (
    <ErrorModal isActive={status === "rejected"} errorMessage={error}>
      <div className={styles.chat}>
        <ChatMessages status={status} messages={messages} userId={localId} />
        <ChatInputs userId={localId} />
      </div>
    </ErrorModal>
  );
};

export default ChatPage;
