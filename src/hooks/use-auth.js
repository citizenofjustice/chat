import { authActions } from "../store/auth-slice";

const useAuth = () => {
  const changeNickname = (idToken, enteredNick) => {
    const updateUserInfoUrl =
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAr3wMeLPj8j_PmyxeoGF-nmAvltdSjdlQ";

    fetch(updateUserInfoUrl, {
      method: "POST",
      body: JSON.stringify({
        idToken: idToken,
        displayName: enteredNick !== null ? enteredNick : null,
        deleteAttribute: enteredNick === null ? "DISPLAY_NAME" : null,
        returnSecureToken: false,
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
              let errorMessage = "User info change has failed!";
              if (data && data.error && data.error.message) {
                errorMessage = data.error.message;
              }
              throw new Error(errorMessage);
            })
            .catch((err) => alert(err.message));
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  };

  const changeUsername = (idToken, enteredUsername, dispatch) => {
    const updateUsernameUrl =
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAr3wMeLPj8j_PmyxeoGF-nmAvltdSjdlQ";

    fetch(updateUsernameUrl, {
      method: "POST",
      body: JSON.stringify({
        idToken: idToken,
        email: enteredUsername,
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
        console.log(data);
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
  };

  const changePassword = (idToken, enteredPassword, dispatch) => {
    const passwordChangeUrl =
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAr3wMeLPj8j_PmyxeoGF-nmAvltdSjdlQ";

    fetch(passwordChangeUrl, {
      method: "POST",
      body: JSON.stringify({
        idToken: idToken,
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
  };

  const getUserInfo = (idToken) => {
    const getUserInfoUrl =
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAr3wMeLPj8j_PmyxeoGF-nmAvltdSjdlQ";

    fetch(getUserInfoUrl, {
      method: "POST",
      body: JSON.stringify({
        idToken: idToken,
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
              let errorMessage = "User info change has failed!";
              if (data && data.error && data.error.message) {
                errorMessage = data.error.message;
              }
              throw new Error(errorMessage);
            })
            .catch((err) => alert(err.message));
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  };

  return {
    changeNickname,
    changeUsername,
    changePassword,
    getUserInfo,
  };
};
export default useAuth;
