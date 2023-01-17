import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserInfo } from "./userInfo-slice";

const initialState = {
  user: null,
  token: null,
  expirationTime: null,
  status: null,
  error: null,
};

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

      dispatch(
        authActions.login({
          user: email,
          token: idToken,
          expirationTime: expirationTime.toISOString(),
        })
      );
      dispatch(getUserInfo(idToken));

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
      state.expirationTime = actions.payload.expirationTime;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.expirationTime = null;
    },
    updateToken(state, actions) {
      state.token = actions.payload.token;
      state.expirationTime = actions.payload.expirationTime;
    },
    closeError(state) {
      state.error = null;
      state.status = null;
    },
  },
  extraReducers: {
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
