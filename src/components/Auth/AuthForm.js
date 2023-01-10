import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { authActions } from "../../store/auth-slice";
import Button from "../UI/Button";

import styles from "./AuthForm.module.scss";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(false);
  const emailInput = useRef();
  const passwordInput = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInput.current.value;
    const enteredPassword = passwordInput.current.value;
    if (enteredEmail !== "" && enteredPassword !== "") {
      dispatch(authActions.login());
      navigate("/");
    } else {
      console.log("One of input fields of auth window is empty");
    }
  };

  const authModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <section className={styles["auth-form"]}>
      <div className={styles.wrapper}>
        <div className={styles.title}>
          {isLogin ? "Новая учетная запись" : "Войти в учетную запись"}
        </div>
        <form onSubmit={submitHandler}>
          <div className={styles.field}>
            <label htmlFor="email">Электронная почта</label>
            <input ref={emailInput} type="email" id="email" required></input>
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
                {isLogin ? "Зарегистрироваться" : "Войти"}
              </Button>
              <p className={styles.switch} onClick={authModeHandler}>
                {isLogin
                  ? "Есть учетная запись"
                  : "Создать новую учетную запись"}
              </p>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AuthForm;
