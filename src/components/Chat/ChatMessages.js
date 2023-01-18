import styles from "./ChatMessages.module.scss";
import { useEffect, useRef, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../../firebase";

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
      el.style.width = el.scrollWidth + "px";
    });
    messageList.querySelectorAll("textarea").forEach((el) => {
      el.style.whiteSpace = "pre-line";
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
      },
      (error) => {
        console.log("cancel call ", error);
      }
    );
  }, []);

  useEffect(() => {
    if (messages) {
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
            />
          ))}
        <div key="bottom" className={styles.bottom} ref={bottom} />
      </ul>
    </div>
  );
};

const ListItem = (props) => {
  return (
    <li className={`${styles["wrapper"]} ${props.isOwner ? styles.right : ""}`}>
      <span className={styles.message}>
        <textarea
          readOnly
          defaultValue={props.message}
          className={styles["message-content"]}
        />
        {/* </label> */}
        <FormatDate type="time" dateObj={props.date} />
      </span>
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
