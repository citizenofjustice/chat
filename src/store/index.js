import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import authSlice from "./auth-slice";
import chatSlice from "./chat-slice";
import userInfoSlice from "./userInfo-slice";
import uiSlice from "./ui-slice";

// combining reducers for redux-persist
const rootReducer = combineReducers({
  auth: authSlice.reducer,
  userInfo: userInfoSlice.reducer,
  ui: uiSlice.reducer,
  chat: chatSlice.reducer,
});

// configurating redux persist
const persistConfig = {
  key: "root",
  storage,
  blacklist: ["ui", "chat"], // will not be persisted
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
