import styles from "./ChatMessages.module.scss";
import { useEffect, useRef, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../../firebase";
import RoundImage from "../UI/RoundImage";
import placeholderAvatar from "../../assets/placeholderAvatar.png";

const ChatMessages = (props) => {
  const [messages, setMessages] = useState([]);
  const bottom = useRef();

  const styleMessages = () => {
    const messageList = document.getElementById("messageList");
    messageList.querySelectorAll("textarea").forEach((el) => {
      el.style.height = el.setAttribute(
        "style",
        "height: " + el.scrollHeight + "px"
      );
    });
    messageList.querySelectorAll("textarea").forEach((el) => {
      el.style.width = "1px";
      el.style.width = 5 + el.scrollWidth + "px";
    });
    messageList.querySelectorAll("textarea").forEach((el) => {
      el.style.whiteSpace = "pre-wrap";
    });
  };

  useEffect(() => {
    const messagesRef = ref(db, `messages/`);
    onValue(
      messagesRef,
      (snapshot) => {
        const data = snapshot.val();
        const messages = [];
        for (const key in data) {
          const user = data[key];
          for (const msg in user) {
            const msgWithId = {
              ...user[msg],
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
        console.log(messages);
      },
      (error) => {
        console.log("cancel call ", error);
      }
    );
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      styleMessages();
      styleMessages();
      bottom.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
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
        <div key="bottom" className={styles.bottom} ref={bottom} />
      </ul>
    </div>
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
          <p>{props.nick}</p>
          <textarea
            readOnly
            defaultValue={props.message}
            className={styles["message-content"]}
          />
          <FormatDate type="time" dateObj={props.date} />
        </span>
        {/* {props.isOwner && (
          <RoundImage
            size="chat-pic"
            profilePic={props.avatar}
            alt="user-pic"
          />
        )} */}
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
