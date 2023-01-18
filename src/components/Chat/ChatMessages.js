import styles from "./ChatMessages.module.scss";
import { useDispatch, useSelector } from "react-redux";
// import { getAllMessages } from "../../store/chat-slice";
import { useEffect, useRef, useState } from "react";
// import LoadingSpinner from "../UI/LoadingSpinner";
import { ref, onValue } from "firebase/database";
import { db } from "../../firebase";

const ChatMessages = (props) => {
  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.userInfo);
  const bottom = useRef();

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
            messages.push(user[msg]);
          }
        }
        messages.sort(function (a, b) {
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return new Date(a.time) - new Date(b.time);
        });
        console.log(messages);
        setMessages(messages);
      },
      (error) => {
        console.log("cancel call ", error);
      }
    );
    if (props.scroll) {
      bottom.current?.scrollIntoView({ behavior: "smooth" });
    } else {
      bottom.current?.scrollIntoView({ behavior: "auto" });
    }
  }, [dispatch, userData.localId, props.scroll]);

  return (
    <div className={styles.messages}>
      {/* {props.status === "pending" ? (
        <LoadingSpinner />
      ) : ( */}
      <ul className={styles["message-list"]}>
        {messages.map((item) => (
          <div
            key={Math.random()}
            className={`${styles["wrapper"]} ${
              item.ownerId === props.userId ? styles.right : ""
            }`}
          >
            <li className={styles.message} key={item.index}>
              {item.message}
              <br />
              <FormatDate type="time" date={item.time} />
            </li>
          </div>
        ))}
        <div ref={bottom} />
      </ul>
      {/* )} */}
    </div>
  );
};

const FormatDate = (props) => {
  let output;
  const dateObj = new Date(props.date);
  const date = dateObj.toLocaleDateString();
  const time = dateObj.toLocaleTimeString();
  if (props.type === "time") {
    output = time;
  } else if (props.type === "date") {
    output = date;
  }
  return <p className={styles["small-date"]}>{output}</p>;
};

export default ChatMessages;
