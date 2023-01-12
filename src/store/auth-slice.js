import { createSlice } from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem("user"));
const token = JSON.parse(localStorage.getItem("token"));
// if user and token stored in localStorage set them as newInitalState
const initialState = token ? { user, token } : { user: null, token: null };

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
