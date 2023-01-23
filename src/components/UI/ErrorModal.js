import { useDispatch } from "react-redux";

import errorSVG from "../../assets/errorIcon.svg";
import styles from "./ErrorModal.module.scss";
import { authActions } from "../../store/auth-slice";
import { userInfoActions } from "../../store/userInfo-slice";
import { chatActions } from "../../store/chat-slice";

const errors = [
  {
    originalError: "EMAIL_NOT_FOUND",
    errorMessage: "Пользователь с такой электронной почтой не зарегистриован",
  },
  {
    originalError: "EMAIL_EXISTS",
    errorMessage: "Пользователь с такой почтой уже зарегистрирован",
  },
  {
    originalError: "INVALID_PASSWORD",
    errorMessage: "Неверный пароль",
  },
  {
    originalError: "WEAK_PASSWORD : Password should be at least 6 characters",
    errorMessage:
      "Ненадежный пароль, в пароле должно быть как минимум 6 символов",
  },
  {
    originalError: "INVALID_EMAIL",
    errorMessage: "Некорректный e-mail. Проверьте правильность ввода",
  },
  {
    originalError: "CREDENTIAL_TOO_OLD_LOGIN_AGAIN",
    errorMessage:
      "Ваши учетные данные устарели. Попробуйте перезайти в учетную запись",
  },
];

const ErrorModal = (props) => {
  const dispatch = useDispatch();

  const closeErrorHandler = () => {
    dispatch(authActions.closeError());
    dispatch(userInfoActions.closeError());
    dispatch(chatActions.closeError());
  };

  const errorText = errors.find(
    (item) => item.originalError === props.errorMessage
  );

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
                {errorText !== undefined
                  ? errorText.errorMessage
                  : props.errorMessage}
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
