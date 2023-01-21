import { useDispatch } from "react-redux";

import errorSVG from "../../assets/errorIcon.svg";
import styles from "./ErrorModal.module.scss";
import { authActions } from "../../store/auth-slice";
import { userInfoActions } from "../../store/userInfo-slice";
import { chatActions } from "../../store/chat-slice";

const ErrorModal = (props) => {
  const dispatch = useDispatch();

  const closeErrorHandler = () => {
    dispatch(authActions.closeError());
    dispatch(userInfoActions.closeError());
    dispatch(chatActions.closeError());
  };

  return (
    <>
      {props.children}
      {props.isActive && (
        <div className={styles["background-modal"]}>
          <div className={styles.error}>
            <div className={styles.content}>
              <div className={styles.icon}>
                <img src={errorSVG} alt="error icon" />
              </div>
              <p className={styles.message}>
                {props.errorMessage.replace(/_/g, " ")}
              </p>
            </div>
            <div className={styles.controls}>
              <span className={styles.button} onClick={closeErrorHandler}>
                Закрыть
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ErrorModal;
