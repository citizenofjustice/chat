import { useRef } from "react";

import Button from "../UI/Button";
import styles from "./AuthForm.module.scss";

const AuthForm = () => {
  const emailInput = useRef();
  const passwordInput = useRef();

  const submitHandler = () => {
    const enteredEmail = emailInput.current.value;
    const enteredPassword = passwordInput.current.value;
    if (enteredEmail !== "" && enteredPassword !== "") {
    } else {
      console.log("One of input fields of auth window is empty");
    }
  };

  return (
    <section className={styles["auth-form"]}>
      <div className={styles.wrapper}>
        <div className={styles.title}>Зарегистрироваться</div>
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
          <div className={styles.actions}>
            <Button type="green">Создать аккаунт</Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AuthForm;
