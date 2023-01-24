import { createSlice } from "@reduxjs/toolkit";

// defining UI slice for redux toolkit
const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isMenuShown: false,
  },
  reducers: {
    /**
     * Toggle boolean state for showing/closing side menu
     * @param {*} state
     */
    toggleMenu(state) {
      state.isMenuShown = !state.isMenuShown;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
