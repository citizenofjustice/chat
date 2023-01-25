import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authActions } from "./auth-slice";

export const changeUsername = createAsyncThunk(
  "userInfo/changeUsername",
  /**
   * changeUsername async function for email change
   * @returns {void | object} - if change fails return obj with error
   */
  async function (
    { token, enteredUsername },
    { rejectWithValue, dispatch, getState }
  ) {
    // getting email from redux
    const { email } = getState().userInfo.userData;

    // if current email of user equals to entered by user for changing return error
    if (email === enteredUsername) {
      return rejectWithValue("Введенная почта сопадает с ее текущим значением");
    }

    // defineing const with url for fetch request
    const updateUsernameUrl =
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAr3wMeLPj8j_PmyxeoGF-nmAvltdSjdlQ";
    try {
      // sending POST request for changing email
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

      // reciving data from request
      const data = await response.json();

      // if request has failed throw error
      if (!response.ok) {
        let errorMessage = "Password change failed!";
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }
        throw new Error(errorMessage);
      }

      // destructuring certain data
      const { idToken, expiresIn } = data;

      // converting object into number and multiply to miliseconds value
      const duration = +expiresIn * 1000;

      // calculating when token will expire
      const expirationTime = new Date(new Date().getTime() + duration);

      // passing down data to redux state
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

export const changePassword = createAsyncThunk(
  "userInfo/changePassword",
  /**
   * changePassword async function for password change
   * @returns {void | object} - if change fails return obj with error
   */
  async function ({ token, enteredPassword }, { rejectWithValue, dispatch }) {
    try {
      // defineing const with url for fetch request
      const passwordChangeUrl =
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAr3wMeLPj8j_PmyxeoGF-nmAvltdSjdlQ";

      // sending POST request for changing password
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

      // reciving data from request
      const data = await response.json();

      // if request has failed throw error
      if (!response.ok) {
        let errorMessage = "Password change failed!";
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }
        throw new Error(errorMessage);
      }

      // destructuring certain data
      const { idToken, expiresIn } = data;

      // converting object into number and multiply to miliseconds value
      const duration = +expiresIn * 1000;

      // calculating when token will expire
      const expirationTime = new Date(new Date().getTime() + duration);

      // passing down data to redux state
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
  /**
   * getUserInfo async function for getting user info from firebase auth
   * @returns {object} - returns user info obj or error obj
   */
  async function (token, { rejectWithValue }) {
    // getting current user local id from redux
    const getUserInfoUrl =
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAr3wMeLPj8j_PmyxeoGF-nmAvltdSjdlQ";
    try {
      // sending the POST request to firebase auth api for getting user info
      const response = await fetch(getUserInfoUrl, {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // reciving data from request
      const data = await response.json();

      // if request has failed throw error
      if (!response.ok) {
        let errorMessage = "User info fetching has failed!";
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }
        throw new Error(errorMessage);
      }

      // setting const with array of user info
      const userInfo = data.users[0];
      return userInfo;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "userInfo/updateUserInfo",
  /**
   * updateProfile async function for updating a certian user info attribute in firebase auth api
   * @returns {object} - returns obj with nickname and profilePic url
   */
  async function ({ type, token, newValue }, { rejectWithValue }) {
    // getting current user local id from redux
    const updateProfileUrl =
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAr3wMeLPj8j_PmyxeoGF-nmAvltdSjdlQ";

    // defininig variable for setting it with body object needed in fetch request
    let bodyObj = {};

    // if function was called with type - profilePicture
    if (type === "profilePicture") {
      // obj for body of fetch, to update picture
      bodyObj = {
        idToken: token,
        photoUrl: newValue !== null ? newValue : null,
        deleteAttribute: newValue === null ? "PHOTO_URL" : null,
        returnSecureToken: false,
      };
    }

    // if function was called with type - nickname
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
      // sending the POST request to update user info in firebase auth api
      const response = await fetch(updateProfileUrl, {
        method: "POST",
        body: JSON.stringify(bodyObj),
        headers: { "Content-Type": "application/json" },
      });

      // reciving data from request
      const data = await response.json();

      // if request has failed throw error
      if (!response.ok) {
        let errorMessage = "Profile picture change failed!";
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }
        throw new Error(errorMessage);
      }

      // destructuring recived data to return just needed attributes
      const { displayName, photoUrl } = data;

      return { displayName, photoUrl };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Function for sending user info to the database
 * @param {string} userId - unique user id (which we have got from firebase auth api)
 * @param {string} value - value which being sent
 * @param {string} infoType - type of info being sent (used for creating corresponding path in database)
 */
export const setUserInfoToDb = async (userId, value, infoType) => {
  try {
    // sending the PUT request with user info
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

    // if request has failed throw error
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

/**
 * Function for getting user infor from database based on unique user id
 * @param {string} userId - unique user identificator
 * @returns {object} - object with user info form database and user id
 */
export const getUserInfoFromDb = async (userId) => {
  try {
    // sending the GET request to a database with defined userId
    const response = await fetch(
      `https://chat-app-1e2f6-default-rtdb.europe-west1.firebasedatabase.app/users/${userId}.json`
    );

    // if request has failed throw error
    if (!response.ok) {
      throw new Error(
        "User info setting to database failed. ",
        response.statusText
      );
    }

    // reciving data from request
    const data = await response.json();

    // creating new object with data form database and userId from function parametrs
    const result = {
      ...data,
      userId: userId,
    };

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * object with initail state for a redux toolkit slice
 * @const {object}
 */
const initialState = {
  userData: {},
  status: null,
  error: null,
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    /**
     * Clear state on error modal closing
     * @param {*} state
     */
    closeError(state) {
      state.error = null;
      state.status = null;
    },
    /**
     * Reset state
     * @param {*} state
     */
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
      // creating copy of current state
      const newObj = state.userData;
      // iterating through copy obj and updating it with values from payload
      for (const key in newObj) {
        if (key === "displayName") {
          newObj[key] = action.payload.displayName;
        }
        if (key === "photoUrl") {
          newObj[key] = action.payload.photoUrl;
        }
      }
      // setting newly created copy obj as new value for userData state
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
