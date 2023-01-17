import styles from "./ChatMessages.module.scss";
import LoadingSpinner from "../UI/LoadingSpinner";
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

const ChatMessages = (props) => {
  const messageArray = props.messages;

  return (
    <div className={styles.messages}>
      {props.status === "pending" ? (
        <LoadingSpinner />
      ) : (
        <ul className={styles["message-list"]}>
          {messageArray.map((item) => (
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
        </ul>
      )}
    </div>
  );
};

export default ChatMessages;
