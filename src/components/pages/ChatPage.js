import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMessages } from "../../store/chat-slice";
import styles from "./ChatPage.module.scss";

import ErrorModal from "../UI/ErrorModal";
import ChatInputs from "../Chat/ChatInputs";
import ChatMessages from "../Chat/ChatMessages";

const ChatPage = () => {
  const dispatch = useDispatch();
  const { messages, status, error } = useSelector((state) => state.chat);
  const { userData } = useSelector((state) => state.userInfo);
  const { localId } = userData;

  useEffect(() => {
    dispatch(getAllMessages());
  }, [dispatch]);

  return (
    <ErrorModal isActive={status === "rejected"} errorMessage={error}>
      <div className={styles.chat}>
        <div className={styles["scroll-wrapper"]}>
          <ChatMessages status={status} messages={messages} userId={localId} />
        </div>
        <ChatInputs userId={localId} />
      </div>
    </ErrorModal>
  );
};

export default ChatPage;
