import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import timerSlice from "./timer-slice";

const store = configureStore({
  reducer: { auth: authSlice.reducer, timer: timerSlice.reducer },
});

export default store;
