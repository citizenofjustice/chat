import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserInfo } from "./userInfo-slice";

/**
 * object with initail state for a redux toolkit slice
 * @const {object}
 */
const initialState = {
  user: null,
  token: null,
  expirationTime: null,
  status: null,
  error: null,
};

export const authUser = createAsyncThunk(
  "auth/authUser",
  /**
   * authUser async function for user authentication
   * @returns {object} - with authentication data (email, token, etc...)
   */
  async function (
    { isLogin, enteredEmail, enteredPassword },
    { rejectWithValue, dispatch }
  ) {
    /**
     * variable for url needed in fetch request
     * @type {string}
     */
    let url;
    // if user has an account reassign variable
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAr3wMeLPj8j_PmyxeoGF-nmAvltdSjdlQ";
    } else {
      // if user wants to create account reassign variable
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAr3wMeLPj8j_PmyxeoGF-nmAvltdSjdlQ";
    }
    try {
      // sending the POST request with email and password data
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

      // reciving data from request
      const data = await response.json();

      // if request has failed throw error
      if (!response.ok) {
        let errorMessage = "Authentication failed!";
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }
        throw new Error(errorMessage);
      }

      // destructuring certain data
      const { email, idToken, expiresIn } = data;

      // converting object into number and multiply to miliseconds value
      const duration = +expiresIn * 1000;

      // calculating when token will expire
      const expirationTime = new Date(new Date().getTime() + duration);

      // passing down data to redux state
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

// defining slice for redux toolkit
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /**
     * setting state with new authentication data
     * @param {*} state
     * @param {*} action
     */
    login(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.expirationTime = action.payload.expirationTime;
    },
    /**
     * Clear state on user logout
     * @param {*} state
     */
    logout(state) {
      state.user = null;
      state.token = null;
      state.expirationTime = null;
    },
    /**
     * refresh token when user changes email or password
     * @param {*} state
     * @param {*} action
     */
    updateToken(state, action) {
      state.token = action.payload.token;
      state.expirationTime = action.payload.expirationTime;
    },
    /**
     * Clear state on error modal closing
     * @param {*} state
     */
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

/**
 * Function that calculates number of milliseconds before token expiration
 * @param {string} expirationTime - token expiration time in ISO format
 * @returns {number} amount of milliseconds before token expiration
 */
export const calcRemainingTime = (expirationTime) => {
  // current date and time in milliseconds
  const currentTime = new Date().getTime();

  // expiration time in milliseconds
  const adjustedExpirationTime = new Date(expirationTime).getTime();

  // getting remaining time by subtraction
  const remainingTime = adjustedExpirationTime - currentTime;

  return remainingTime;
};
