import { useEffect, useRef, useState } from "react";
import { db } from "../../firebase";
import { ref, onValue } from "firebase/database";

import { getUserInfoFromDb } from "../../store/userInfo-slice";

import RoundImage from "../UI/RoundImage";

import placeholderAvatar from "../../assets/placeholderAvatar.png";
import styles from "./ChatMessages.module.scss";

/**
 * Component responsable for displaying and reloading messages
 * @param {string} props.userId - containing userData's localId
 * @returns messages list
 */
const ChatMessages = (props) => {
  // used for scrolling to bottom
  const bottom = useRef();

  // defining array for mapping it later into message list
  const [messages, setMessages] = useState([]);
  // state for triggering useEffect
  const [isMounted, setIsMounted] = useState(false);

  // useEffect for tracking and responding to a realtime database change
  useEffect(() => {
    // reference for tracked database path (containing all messages)
    const messagesRef = ref(db, `messages/`);

    // Firebase API function that tracks and retrieves changes in specified database path
    onValue(
      messagesRef,
      async (snapshot) => {
        // retrieving messages data from database
        const data = await snapshot.val();

        const messages = [];
        // iterating through received data
        for (const key in data) {
          const user = data[key];
          let userInfo;
          // getting user info from database (current iteration)
          userInfo = await getUserInfoFromDb(key);

          // iterating through this user messages
          for (const msg in user) {
            // creating new obj containing message data
            // and adding to it user info we got from database
            const msgWithId = {
              ...user[msg],
              profilePic:
                userInfo.profilePicture === null
                  ? null
                  : userInfo.profilePicture,
              nickname: userInfo.nickname,
              index: msg,
            };
            // pushing new obj into messages array
            messages.push(msgWithId);
          }
        }
        // sorting through the messages array by time
        messages.sort(function (a, b) {
          // turning strings into dates, and then subtracting them
          // to get a value that is either negative, positive, or zero.
          return new Date(a.time) - new Date(b.time);
        });

        // setting state for rendering messages
        setMessages(messages);
        // setting state for triggering another useEffect for scroll (only once)
        setIsMounted(true);
      },
      (error) => {
        throw new Error(error.message);
      }
    );
  }, []);

  // useEffect that triggers when messages are loaded and scrolls list to the bottom ref
  useEffect(() => {
    if (isMounted) {
      bottom.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isMounted]);

  return (
    <div id="messageList" className={styles.messages}>
      <ul className={styles["message-list"]}>
        {messages.length > 0 &&
          messages.map((item) => (
            <Message
              key={item.index}
              isOwner={item.ownerId === props.userId}
              message={item.message}
              date={item.time}
              avatar={item.profilePic}
              nick={item.nickname}
            />
          ))}
      </ul>
      <div className={styles.bottom} ref={bottom} />
    </div>
  );
};

/**
 * Component that represents each message in list
 * @param {boolean} props.isOwner - tells if current user is owner of message
 * @param {string} props.avatar - contains url of the user profile picture
 * @param {string} props.message - content of message
 * @param {string} props.date - date in ISO format
 * @param {string} props.nick - nickname of the owner of message
 * @returns message in list
 */
const Message = (props) => {
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

/**
 * Component that formats the date and time
 * @param {string} props.dateObj - date in ISO format
 * @returns formatted date
 */
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
