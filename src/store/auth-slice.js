import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem("user"));
const token = JSON.parse(localStorage.getItem("token"));
// if user and token stored in localStorage set them as newInitalState
const initialState = token
  ? { user, token, userData: [], status: null, error: null }
  : { user: null, token: null, userData: [], status: null, error: null };

export const getUserInfo = createAsyncThunk(
  "auth/userInfo",
  async function (token, { rejectWithValue }) {
    const getUserInfoUrl =
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAr3wMeLPj8j_PmyxeoGF-nmAvltdSjdlQ";
    try {
      const response = await fetch(getUserInfoUrl, {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      return data.users[0];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const authUser = createAsyncThunk(
  "auth/authUser",
  async function (
    { isLogin, enteredEmail, enteredPassword },
    { rejectWithValue, dispatch }
  ) {
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
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log("response", response);
      if (!response.ok) {
        let errorMessage = "Authentication failed!";
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }
        throw new Error(errorMessage);
      }
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
      dispatch(getUserInfo(idToken));

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const changeUsername = createAsyncThunk(
  "auth/changeUsername",
  async function ({ token, enteredUsername }, { rejectWithValue, getState }) {
    const updateUsernameUrl =
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAr3wMeLPj8j_PmyxeoGF-nmAvltdSjdlQ";
    try {
      const response = await fetch(updateUsernameUrl, {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
          email: enteredUsername,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        let errorMessage = "Password change failed!";
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }
        throw new Error(errorMessage);
      }

      // extracting data from request
      const { email, idToken, expiresIn } = data;
      // converting json into number and multiply to miliseconds value
      const duration = +expiresIn * 1000;
      // calculating when will expire token
      const expirationTime = new Date(new Date().getTime() + duration);

      localStorage.setItem("user", JSON.stringify(email));
      localStorage.setItem("token", JSON.stringify(idToken));
      localStorage.setItem("expirationTime", expirationTime.toISOString());

      return data;
    } catch (error) {
      console.log(error, error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async function ({ type, token, newValue }, { rejectWithValue }) {
    const updateProfileUrl =
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAr3wMeLPj8j_PmyxeoGF-nmAvltdSjdlQ";
    let bodyObj = {};
    if (type === "profilePicture") {
      // obj for body of fetch, to update picture
      bodyObj = {
        idToken: token,
        photoUrl: newValue !== null ? newValue : null,
        deleteAttribute: newValue === null ? "PHOTO_URL" : null,
        returnSecureToken: false,
      };
    }
    if (type === "nickname") {
      //obj for body of fetch, to update nickname
      bodyObj = {
        idToken: token,
        displayName: newValue !== null ? newValue : null,
        deleteAttribute: newValue === null ? "DISPLAY_NAME" : null,
        returnSecureToken: false,
      };
    }
    try {
      const response = await fetch(updateProfileUrl, {
        method: "POST",
        body: JSON.stringify(bodyObj),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (!response.ok) {
        let errorMessage = "Profile picture change failed!";
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }
        throw new Error(errorMessage);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const changePassword = createAsyncThunk(
  "",
  async function ({ token, enteredPassword }, { rejectWithValue }) {
    try {
      const passwordChangeUrl =
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAr3wMeLPj8j_PmyxeoGF-nmAvltdSjdlQ";

      const response = await fetch(passwordChangeUrl, {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) {
        let errorMessage = "Password change failed!";
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }
        throw new Error(errorMessage);
      }

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

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, actions) {
      state.user = actions.payload.user;
      state.token = actions.payload.token;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.userData = [];
    },
    closeError(state) {
      state.error = null;
      state.status = null;
    },
  },
  extraReducers: {
    [updateProfile.pending]: (state) => {
      state.status = "pending";
      state.error = null;
    },
    [updateProfile.fulfilled]: (state) => {
      state.status = "resolved";
    },
    [updateProfile.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
    [changePassword.pending]: (state) => {
      state.status = "pending";
      state.error = null;
    },
    [changePassword.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.user = action.payload.email;
      state.token = action.payload.idToken;
    },
    [changePassword.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
    [getUserInfo.pending]: (state) => {
      state.status = "pending";
      state.error = null;
    },
    [getUserInfo.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.userData = action.payload;
    },
    [getUserInfo.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
    [authUser.pending]: (state) => {
      state.status = "pending";
      state.error = null;
    },
    [authUser.fulfilled]: (state) => {
      state.status = "resolved";
    },
    [authUser.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
    [changeUsername.pending]: (state) => {
      state.status = "pending";
      state.error = null;
    },
    [changeUsername.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.user = action.payload.email;
      state.token = action.payload.idToken;
    },
    [changeUsername.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;

// convert date into number of miliseconds
export const calcRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjustedExpirationTime = new Date(expirationTime).getTime();
  const remainingTime = adjustedExpirationTime - currentTime;
  return remainingTime;
};

// retrive data from storage
export const retriveAuthStorageData = () => {
  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");
  const storedExpirationTime = localStorage.getItem("expirationTime");

  const remainingTime = calcRemainingTime(storedExpirationTime);

  if (remainingTime <= 3600) {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return null;
  }

  return {
    user: storedUser,
    token: storedToken,
    duration: remainingTime,
  };
};
