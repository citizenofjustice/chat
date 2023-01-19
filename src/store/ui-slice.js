import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isMenuShown: false,
  },
  reducers: {
    toggleMenu(state) {
      state.isMenuShown = !state.isMenuShown;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
