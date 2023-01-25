import { useSelector } from "react-redux";

import styles from "./ChatPage.module.scss";

import ChatInputs from "../Chat/ChatInputs";
import ChatMessages from "../Chat/ChatMessages";

/**
 * Component uniting ChatMessages and ChatInputs into single page
 * @returns chat page
 */
const ChatPage = () => {
  const { userData } = useSelector((state) => state.userInfo);
  const { localId } = userData;

  return (
    <section className={styles.chat}>
      <div className={styles.container}>
        <ChatMessages userId={localId} />
        <ChatInputs userId={localId} />
      </div>
    </section>
  );
};

export default ChatPage;
