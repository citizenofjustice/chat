import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";

import styles from "./EditProfile.module.scss";

const EditProfile = () => {
  const changeUsernameInput = useRef();
  const changePasswordInput = useRef();
  const currentIdToken = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const changeUsernameHandler = (event) => {
    event.preventDefault();
    const updateUserInfoUrl =
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAr3wMeLPj8j_PmyxeoGF-nmAvltdSjdlQ";

    fetch(updateUserInfoUrl, {
      method: "POST",
      body: JSON.stringify({
        idToken: currentIdToken,
        email: changeUsernameInput.current.value,
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
              let errorMessage = "Password change failed!";
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
        // extracting data from request
        const { email, idToken, expiresIn } = data;
        // converting json into number and multiply to miliseconds value
        const duration = +expiresIn * 1000;
        // calculating when will expire token
        const expirationTime = new Date(new Date().getTime() + duration);

        localStorage.setItem("user", JSON.stringify(email));
        localStorage.setItem("token", JSON.stringify(idToken));
        localStorage.setItem("expirationTime", expirationTime.toISOString());

        dispatch(authActions.login({ user: email, token: idToken }));
      })
      .catch((err) => {
        throw new Error(err.message);
      });

    changeUsernameInput.current.value = "";
  };

  const changePasswordHandler = (event) => {
    event.preventDefault();

    const passwordChangeUrl =
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAr3wMeLPj8j_PmyxeoGF-nmAvltdSjdlQ";

    fetch(passwordChangeUrl, {
      method: "POST",
      body: JSON.stringify({
        idToken: currentIdToken,
        password: changePasswordInput.current.value,
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
              let errorMessage = "Password change failed!";
              if (data && data.error && data.error.message) {
                errorMessage = data.error.message;
              }
              throw new Error(errorMessage);
            })
            .catch((err) => alert(err.message));
        }
      })
      .then((data) => {
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

        dispatch(authActions.login({ user: email, token: idToken }));
      })
      .catch((err) => {
        throw new Error(err.message);
      });

    changePasswordInput.current.value = "";
  };

  return (
    <section className={styles["edit-form"]}>
      <form className={styles.form}>
        <div className={styles.changes}>
          <label htmlFor="username-change">Почта/Логин:</label>
          <input ref={changeUsernameInput} id="username-change" />
          <span className={styles.button} onClick={changeUsernameHandler}>
            Поменять
          </span>
        </div>
        <div className={styles.changes}>
          <label htmlFor="password-change">Пароль: </label>
          <input
            ref={changePasswordInput}
            type="password"
            id="password-change"
          />
          <span className={styles.button} onClick={changePasswordHandler}>
            Поменять
          </span>
        </div>
      </form>
    </section>
  );
};
export default EditProfile;
