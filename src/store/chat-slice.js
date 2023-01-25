import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  /**
   * sendMessage async function for sending the message to a chat
   * @returns {void | object}
   */
  async function ({ message, time }, { rejectWithValue, getState }) {
    // getting current user local id from redux
    const { localId } = getState().userInfo.userData;
    try {
      // sending the POST request to database for adding message by the current user
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

      // reciving data from request
      const data = await response.json();

      // if request has failed throw error
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

/**
 * object with initail state for a redux toolkit slice
 * @const {object}
 */
const initialState = {
  status: null,
  error: null,
};

// defining slice for redux toolkit
const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    /**
     * Clear state on error modal closing
     * @param {*} state
     */
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
