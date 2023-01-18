import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async function ({ userId, message, time }, { rejectWithValue }) {
    try {
      const response = await fetch(
        `https://chat-app-1e2f6-default-rtdb.europe-west1.firebasedatabase.app/messages/${userId}.json`,
        {
          method: "POST",
          body: JSON.stringify({ message, time, ownerId: userId }),
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("sendMessage resp = ", response);
      const data = await response.json();
      console.log("sendMessage data =", data);
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

// export const getAllMessages = createAsyncThunk(
//   "chat/getMessages",
//   async function (_, { rejectWithValue }) {
//     try {
//       const response = await fetch(
//         `https://chat-app-1e2f6-default-rtdb.europe-west1.firebasedatabase.app/messages.json`
//       );

//       const data = await response.json();
//       if (!response.ok) {
//         let errorMessage = "Messages fetching has failed!";
//         if (data && data.error && data.error.message) {
//           errorMessage = data.error.message;
//         }
//         throw new Error(errorMessage);
//       }
//       const messages = [];
//       for (const key in data) {
//         const user = data[key];
//         for (const msg in user) {
//           messages.push(user[msg]);
//         }
//       }
//       console.log(messages);
//       messages.sort(function (a, b) {
//         // Turn your strings into dates, and then subtract them
//         // to get a value that is either negative, positive, or zero.
//         return new Date(a.time) - new Date(b.time);
//       });
//       return messages;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

const initialState = {
  messages: [],
  status: null,
  error: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage(state, action) {
      state.messages.push(action.payload.message);
    },
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
    // [getAllMessages.pending]: (state) => {
    //   state.status = "pending";
    //   state.error = null;
    // },
    // [getAllMessages.fulfilled]: (state, actions) => {
    //   state.status = "resolved";
    //   state.messages = actions.payload;
    // },
    // [getAllMessages.rejected]: (state, action) => {
    //   state.status = "rejected";
    //   state.error = action.payload;
    // },
  },
});

export const chatActions = chatSlice.actions;
export default chatSlice;
