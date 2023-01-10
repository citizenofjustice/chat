import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userIsLoggedIn: false,
  },
  reducers: {
    login(state) {
      state.userIsLoggedIn = true;
    },
    logout(state) {
      state.userIsLoggedIn = false;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
