import { createSlice } from "@reduxjs/toolkit";

const nicknameSlice = createSlice({
  name: "nick",
  initialState: {
    nick: null,
  },
  reducers: {
    setNickname(state, actions) {
      state.nick = actions.payload.nick;
    },
    clearNickname(state) {
      state.nick = null;
    },
  },
});

export const nicknameActions = nicknameSlice.actions;
export default nicknameSlice;
