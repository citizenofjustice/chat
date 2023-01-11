import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
  },
  reducers: {
    login(state, action) {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
    },
    logout(state) {
      state.user = null;
      state.token = null;
    },
  },
});

export const loginUser = async (isAuth, email, password) => {
  let url;
  if (isAuth) {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAr3wMeLPj8j_PmyxeoGF-nmAvltdSjdlQ";
  } else {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAr3wMeLPj8j_PmyxeoGF-nmAvltdSjdlQ";
  }
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (response.status === 200) {
      localStorage.setItem("token", data.idToken);
      return data;
    } else {
      let errorMessage = "Authentication failed!";
      if (data && data.error && data.error.message) {
        errorMessage = data.error.message;
      }
      throw new Error(errorMessage);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const logoutUser = () => {
  localStorage.removeItem("token");
};

export const getTokenHandler = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

export const authActions = authSlice.actions;
export default authSlice;
