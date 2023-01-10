import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { authActions } from "../../store/auth-slice";
import Button from "../UI/Button";

import styles from "./AuthForm.module.scss";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const emailInput = useRef();
  const passwordInput = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInput.current.value;
    const enteredPassword = passwordInput.current.value;

    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAr3wMeLPj8j_PmyxeoGF-nmAvltdSjdlQ";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAr3wMeLPj8j_PmyxeoGF-nmAvltdSjdlQ";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          res
            .json()
            .then((data) => {
              let errorMessage = "Authentication failed!";
              if (data && data.error && data.error.message) {
                errorMessage = data.error.message;
              }
              throw new Error(errorMessage);
            })
            .catch((err) => {
              alert(err.message);
            });
        }
      })
      .then((data) => {
        if (data) {
          dispatch(authActions.login());
          navigate("/");
        }
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  };

  const authModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <section className={styles["auth-form"]}>
      <div className={styles.wrapper}>
        <div className={styles.title}>
          {isLogin ? "Войти в учетную запись" : "Новая учетная запись"}
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
  );
};

export default AuthForm;
