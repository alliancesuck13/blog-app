/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

import getStateFromLocalStorage from "../../utils/getStateFromLocalStorage";

const userSlice = createSlice({
  name: "user",
  initialState: {
    token: getStateFromLocalStorage("token", ""),
    username: getStateFromLocalStorage("username", ""),
    email: getStateFromLocalStorage("email", ""),
    image: getStateFromLocalStorage("image", null),
    loggedIn: getStateFromLocalStorage("loggedIn", false),
  },

  reducers: {
    loadUserData(state, action) {
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.image = action.payload.image || null;
      state.loggedIn = true;

      localStorage.setItem("token", JSON.stringify(action.payload.token));
      localStorage.setItem("username", JSON.stringify(action.payload.username));
      localStorage.setItem("email", JSON.stringify(action.payload.email));
      localStorage.setItem("image", JSON.stringify(action.payload.image || null));
      localStorage.setItem("loggedIn", JSON.stringify(true));
    },

    updateUserData(state, action) {
      state.token = action.payload.updatedToken;
      state.username = action.payload.updatedUsername;
      state.email = action.payload.updatedEmail;
      state.image = action.payload.updatedImage;

      localStorage.setItem("token", JSON.stringify(action.payload.updatedToken));
      localStorage.setItem("username", JSON.stringify(action.payload.updatedUsername));
      localStorage.setItem("email", JSON.stringify(action.payload.updatedEmail));
      localStorage.setItem("image", JSON.stringify(action.payload.updatedImage));
    },

    signOut(state) {
      state.loggedIn = false;
      state.token = "";
      state.username = "";
      state.email = "";
      state.image = null;

      localStorage.setItem("token", JSON.stringify(""));
      localStorage.setItem("username", JSON.stringify(""));
      localStorage.setItem("email", JSON.stringify(""));
      localStorage.setItem("image", JSON.stringify(null));
      localStorage.setItem("loggedIn", JSON.stringify(false));
    },
  },
});

export const { loadUserData, signOut, updateUserData } = userSlice.actions;
export default userSlice.reducer;
