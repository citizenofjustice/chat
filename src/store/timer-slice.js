import { createSlice } from "@reduxjs/toolkit";

const timerSlice = createSlice({
  name: "timer",
  initialState: {
    timer: 0,
  },
  reducers: {
    setTimer(state, action) {
      state.timer = action.payload;
    },
    clearTimer(state) {
      state.timer = 0;
    },
  },
});

export const timerActions = timerSlice.actions;
export default timerSlice;
