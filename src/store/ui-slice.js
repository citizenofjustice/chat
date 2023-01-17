import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    errorMessage: null,
  },
  reducers: {},
});

export const uiActions = createSlice.actions;
export default uiSlice;
