const login = (isLogin, emailInput, passwordInput) => {
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
      email: emailInput,
      password: passwordInput,
      returnSecureToken: true,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        console.log("res.json()", res.json());
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
        localStorage.setItem("user", JSON.stringify(data.email));
        return data;
        // dispatch(authActions.login());
        // navigate("/");
      }
    })
    .catch((err) => {
      throw new Error(err.message);
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const AuthService = {
  // register,
  login,
  logout,
  // getCurrentUser,
};

export default AuthService;
