import styles from "./ChatMessages.module.scss";
import { useEffect, useRef, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../../firebase";
import RoundImage from "../UI/RoundImage";
import placeholderAvatar from "../../assets/placeholderAvatar.png";
import { getUserInfoFromDb } from "../../store/userInfo-slice";

const ChatMessages = (props) => {
  const [messages, setMessages] = useState([]);
  const bottom = useRef();
  // const [familiarUsers, setFamiliarUsers] = useState([]);
  let [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const messagesRef = ref(db, `messages/`);
    onValue(
      messagesRef,
      async (snapshot) => {
        const data = await snapshot.val();
        const messages = [];
        for (const key in data) {
          const user = data[key];
          let userInfo;
          // const familiar = familiarUsers.find((item) => item.userId === key);
          // if (familiar === undefined) {
          userInfo = await getUserInfoFromDb(key);
          // setFamiliarUsers((familiarUsers) => [...familiarUsers, userInfo]);
          // } else userInfo = familiar;
          for (const msg in user) {
            const msgWithId = {
              ...user[msg],
              profilePic:
                userInfo.profilePicture === null
                  ? null
                  : userInfo.profilePicture,
              nickname: userInfo.nickname,
              index: msg,
            };
            messages.push(msgWithId);
          }
        }
        messages.sort(function (a, b) {
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return new Date(a.time) - new Date(b.time);
        });
        setMessages(messages);
        setIsMounted(true);
      },
      (error) => {
        throw new Error(error.message);
      }
    );
  }, []);

  useEffect(() => {
    if (isMounted) {
      bottom.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isMounted]);

  return (
    // <div className={styles.wrapper}>
    <div id="messageList" className={styles.messages}>
      <ul className={styles["message-list"]}>
        {messages.length > 0 &&
          messages.map((item) => (
            <ListItem
              key={item.index}
              isOwner={item.ownerId === props.userId}
              message={item.message}
              date={item.time}
              avatar={item.profilePic}
              nick={item.nickname}
            />
          ))}
        {/* {props.currentMessage !== null && (
          <ListItem
          key={props.currentMessage.key}
          isOwner={props.currentMessage.ownerId === props.userId}
          message={props.currentMessage.message}
          date={props.currentMessage.time}
          avatar={props.currentMessage.profilePic}
          nick={props.currentMessage.nickname}
          />
        )} */}
      </ul>
      <div className={styles.bottom} ref={bottom} />
    </div>
    // </div>
  );
};

const ListItem = (props) => {
  return (
    <li className={styles["list-item"]}>
      <div
        className={`${styles["wrapper"]} ${props.isOwner ? styles.right : ""}`}
      >
        {!props.isOwner && (
          <RoundImage
            size="chat-pic"
            profilePic={props.avatar ? props.avatar : placeholderAvatar}
            alt="user-pic"
          />
        )}
        <span className={styles.message}>
          {!props.isOwner && <p className={styles.nickname}>{props.nick}</p>}
          {props.message}
          <FormatDate type="time" dateObj={props.date} />
        </span>
      </div>
    </li>
  );
};

const FormatDate = (props) => {
  let output;
  const dateObj = new Date(props.dateObj);
  const date = dateObj.toLocaleDateString();
  const time = dateObj.toLocaleTimeString();
  if (props.type === "time") {
    output = time.slice(0, 5);
  } else if (props.type === "date") {
    output = date;
  }
  return <p className={styles["small-date"]}>{output}</p>;
};

export default ChatMessages;
