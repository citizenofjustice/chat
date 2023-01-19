import { useSelector } from "react-redux";

import styles from "./ChatPage.module.scss";

import ErrorModal from "../UI/ErrorModal";
import ChatInputs from "../Chat/ChatInputs";
import ChatMessages from "../Chat/ChatMessages";

const ChatPage = () => {
  const { messages, status, error } = useSelector((state) => state.chat);
  const { userData } = useSelector((state) => state.userInfo);
  const { localId, displayName } = userData;

  return (
    <ErrorModal isActive={status === "rejected"} errorMessage={error}>
      <section className={styles.chat}>
        <ChatMessages
          status={status}
          messages={messages}
          userId={localId}
          nickname={displayName}
        />
        <ChatInputs userId={localId} />
      </section>
    </ErrorModal>
  );
};

export default ChatPage;
