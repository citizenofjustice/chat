import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { authUser } from "../../store/auth-slice";

import ErrorModal from "../UI/ErrorModal";
import Button from "../UI/Button";
import LoadingSpinner from "../UI/LoadingSpinner";

import styles from "./AuthForm.module.scss";

/**
 * Component responsable for user authentication
 * @returns authentication form
 */
const AuthForm = () => {
  // selecting status and error from redux Auth slice
  const { status, error } = useSelector((state) => state.auth);

  // defining state for changing authentication mode
  const [isLogin, setIsLogin] = useState(true);

  const dispatch = useDispatch();
  const emailInput = useRef();
  const passwordInput = useRef();

  /**
   * handling login/sing-in data submittion
   * @param {*} event - when form is submitted
   * @returns {void}
   */
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInput.current.value;
    const enteredPassword = passwordInput.current.value;

    // calling authUser function from auth slice
    dispatch(authUser({ isLogin, enteredEmail, enteredPassword }));
  };

  /**
   * function for toggling authentication mode
   * @returns {void}
   */
  const authModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <ErrorModal isActive={status === "rejected"} errorMessage={error}>
      {status === "pending" ? (
        <LoadingSpinner />
      ) : (
        <section className={styles["auth-form"]}>
          <div className={styles.wrapper}>
            <div className={styles.title}>
              {isLogin ? "Войти в учетную запись" : "Новая учетная запись"}
            </div>
            <form onSubmit={submitHandler}>
              <div className={styles.field}>
                <label htmlFor="email">Электронная почта</label>
                <input
                  autoFocus
                  ref={emailInput}
                  type="email"
                  id="email"
                  required
                ></input>
              </div>
              <div className={styles.field}>
                <label htmlFor="password">Пароль</label>
                <input
                  ref={passwordInput}
                  type="password"
                  id="password"
                  required
                ></input>
              </div>
              <div>
                <div className={styles.actions}>
                  <Button type="green">
                    {isLogin ? "Войти" : "Зарегистрироваться"}
                  </Button>
                  <p className={styles.switch} onClick={authModeHandler}>
                    {isLogin
                      ? "Создать новую учетную запись"
                      : "Есть учетная запись"}
                  </p>
                </div>
              </div>
            </form>
          </div>
        </section>
      )}
    </ErrorModal>
  );
};

export default AuthForm;
