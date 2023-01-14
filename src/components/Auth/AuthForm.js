import { useRef, useState } from "react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth-slice";

import Button from "../UI/Button";
import styles from "./AuthForm.module.scss";

const AuthForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // state that stores auth form mode
  const [isLogin, setIsLogin] = useState(true);
  const emailInput = useRef();
  const passwordInput = useRef();

  // handling login/sing-in data submittion
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInput.current.value;
    const enteredPassword = passwordInput.current.value;

    let url;
    // if user has an account
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAr3wMeLPj8j_PmyxeoGF-nmAvltdSjdlQ";
    } else {
      // if user wants to create account
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
          // extracting data from request
          const { email, idToken, expiresIn } = data;
          // converting json into number and multiply to miliseconds value
          const duration = +expiresIn * 1000;
          // calculating when will expire token
          const expirationTime = new Date(new Date().getTime() + duration);

          // setting data into storage
          localStorage.setItem("user", JSON.stringify(email));
          localStorage.setItem("token", JSON.stringify(idToken));
          localStorage.setItem("expirationTime", expirationTime.toISOString());

          // performing redux actions for storing data
          dispatch(authActions.login({ user: email, token: idToken }));

          // load profile page

          isLogin ? navigate("/profile") : navigate("/profile/settings");
        }
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  };

  // function for changing form auth mode
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
