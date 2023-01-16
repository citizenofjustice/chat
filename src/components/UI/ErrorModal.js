import { useDispatch } from "react-redux";

import { authActions } from "../../store/auth-slice";

import errorSVG from "../../assets/errorIcon.svg";
import styles from "./ErrorModal.module.scss";

const ErrorModal = (props) => {
  const dispatch = useDispatch();

  const closeErrorHandler = () => {
    dispatch(authActions.closeError());
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
              <div className={styles.message}>
                <div>{props.errorMessage}</div>
              </div>
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
