import { createSlice } from "@reduxjs/toolkit";

const storedNick = localStorage.getItem("nick");
const initialState = {
  nick: storedNick ? storedNick : null,
};

const nicknameSlice = createSlice({
  name: "nick",
  initialState,
  reducers: {
    setNickname(state, actions) {
      state.nick = actions.payload.nick;
    },
    clearNickname(state) {
      state.nick = null;
      localStorage.removeItem("nick");
    },
  },
});

export const nicknameActions = nicknameSlice.actions;
export default nicknameSlice;
