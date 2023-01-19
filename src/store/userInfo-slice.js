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
      const userInfo = data.users[0];
      return userInfo;
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
      const { displayName, photoUrl } = data;
      return { displayName, photoUrl };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const setUserInfoToDb = async (userId, value, infoType) => {
  try {
    const response = await fetch(
      `https://chat-app-1e2f6-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}/${infoType}.json`,
      {
        method: "PUT",
        body: JSON.stringify(value),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(
        "User info setting to database failed. ",
        response.statusText
      );
    }
    await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUserInfoFromDb = async (userId) => {
  try {
    const response = await fetch(
      `https://chat-app-1e2f6-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}.json`
    );
    if (!response.ok) {
      throw new Error(
        "User info setting to database failed. ",
        response.statusText
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const initialState = {
  userData: {},
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
    [updateProfile.fulfilled]: (state, action) => {
      state.status = "resolved";
      const newObj = state.userData;
      for (const key in newObj) {
        if (key === "displayName") {
          newObj[key] = action.payload.displayName;
        }
        if (key === "photoUrl") {
          newObj[key] = action.payload.photoUrl;
        }
      }
      state.userData = newObj;
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
