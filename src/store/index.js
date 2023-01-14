import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import nicknameSlice from "./nickname-slice";

const store = configureStore({
  reducer: { auth: authSlice.reducer, nick: nicknameSlice.reducer },
});

export default store;
