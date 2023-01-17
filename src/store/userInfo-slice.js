import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authActions } from "./auth-slice";

export const changeUsername = createAsyncThunk(
  "userInfo/changeUsername",
  async function ({ token, enteredUsername }, { rejectWithValue, dispatch }) {
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
      const { idToken, expiresIn } = data;
      // converting json into number and multiply to miliseconds value
      const duration = +expiresIn * 1000;
      // calculating when will expire token
      const expirationTime = new Date(new Date().getTime() + duration);

      dispatch(
        authActions.updateToken({
          token: idToken,
          expirationTime: expirationTime.toISOString(),
        })
      );

      return data;
    } catch (error) {
      console.log(error, error.message);
      return rejectWithValue(error.message);
    }
  }
);

export const changePassword = createAsyncThunk(
  "userInfo/changePassword",
  async function ({ token, enteredPassword }, { rejectWithValue, dispatch }) {
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
      const { idToken, expiresIn } = data;
      // converting json into number and multiply to miliseconds value
      const duration = +expiresIn * 1000;
      // calculating when will expire token
      const expirationTime = new Date(new Date().getTime() + duration);

      dispatch(
        authActions.updateToken({
          token: idToken,
          expirationTime: expirationTime.toISOString(),
        })
      );
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUserInfo = createAsyncThunk(
  "userInfo/fetchUserInfo",
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

export const updateProfile = createAsyncThunk(
  "userInfo/updateUserInfo",
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

const initialState = {
  userData: [],
  status: null,
  error: null,
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    closeError(state) {
      state.error = null;
      state.status = null;
    },
    clearUserInfo(state) {
      state.userData = [];
      state.status = null;
      state.error = null;
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
    [changePassword.fulfilled]: (state) => {
      state.status = "resolved";
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
    [changeUsername.pending]: (state) => {
      state.status = "pending";
      state.error = null;
    },
    [changeUsername.fulfilled]: (state) => {
      state.status = "resolved";
    },
    [changeUsername.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
  },
});

export const userInfoActions = userInfoSlice.actions;
export default userInfoSlice;
