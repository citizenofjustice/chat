import { createSlice } from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem("user"));
const token = JSON.parse(localStorage.getItem("token"));
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
