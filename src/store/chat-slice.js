import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async function ({ message, time }, { rejectWithValue, getState }) {
    const { localId } = getState().userInfo.userData;
    try {
      const response = await fetch(
        `https://chat-app-1e2f6-default-rtdb.europe-west1.firebasedatabase.app/messages/${localId}.json`,
        {
          method: "POST",
          body: JSON.stringify({
            message,
            time,
            ownerId: localId,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      if (!response.ok) {
        let errorMessage = "Message sending failed!";
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }
        throw new Error(errorMessage);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  status: null,
  error: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    closeError(state) {
      state.error = null;
      state.status = null;
    },
  },
  extraReducers: {
    [sendMessage.pending]: (state) => {
      state.status = "pending";
      state.error = null;
    },
    [sendMessage.fulfilled]: (state) => {
      state.status = "resolved";
    },
    [sendMessage.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
  },
});

export const chatActions = chatSlice.actions;
export default chatSlice;
