import { useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth-slice";
import { nicknameActions } from "../../store/nickname-slice";
import useAuth from "../../hooks/use-auth";

import Button from "../UI/Button";
import styles from "./AuthForm.module.scss";

const AuthForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const nickname = useSelector((state) => state.nick.nick);

  // state that stores auth form mode
  const [isLogin, setIsLogin] = useState(true);
  const emailInput = useRef();
  const passwordInput = useRef();
  const { authUser, getNickname } = useAuth();

  // handling login/sing-in data submittion
  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailInput.current.value;
    const enteredPassword = passwordInput.current.value;

    const data = await authUser(isLogin, enteredEmail, enteredPassword);

    try {
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

        const fetchedNick = await getNickname(nickname, idToken);

        // loading certain page if user already set nickname
        if (fetchedNick === undefined) {
          navigate("/profile/settings");
        } else {
          localStorage.setItem("nick", fetchedNick);
          dispatch(nicknameActions.setNickname({ nick: fetchedNick }));
          navigate("/profile");
        }
      }
    } catch (error) {
      throw new Error(error.message);
    }
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
