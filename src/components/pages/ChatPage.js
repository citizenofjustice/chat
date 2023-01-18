import { useSelector } from "react-redux";

import styles from "./ChatPage.module.scss";

import ErrorModal from "../UI/ErrorModal";
import ChatInputs from "../Chat/ChatInputs";
import ChatMessages from "../Chat/ChatMessages";
import { useState } from "react";

const ChatPage = () => {
  const { messages, status, error } = useSelector((state) => state.chat);
  const { userData } = useSelector((state) => state.userInfo);
  const { localId } = userData;
  const [scroll, setScroll] = useState(false);

  const addMessageHandler = (bool) => {
    console.log(scroll);
    setScroll(bool);
  };

  return (
    <ErrorModal isActive={status === "rejected"} errorMessage={error}>
      <div className={styles.chat}>
        {/* <div className={styles["scroll-wrapper"]}> */}
        <ChatMessages
          status={status}
          messages={messages}
          userId={localId}
          scroll={scroll}
        />
        {/* </div> */}
        <ChatInputs onAdditon={addMessageHandler} userId={localId} />
      </div>
    </ErrorModal>
  );
};

export default ChatPage;
