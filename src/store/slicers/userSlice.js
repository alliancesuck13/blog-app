/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    token: "token.is.here",
    username: "username",
    email: "",
    image: null,
    loggedIn: false,
  },

  reducers: {
    loadUserData(state, action) {
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.image = action.payload.image;
      state.loggedIn = true;
    },

    updateUserData(state, action) {
      state.token = action.payload.updatedToken;
      state.username = action.payload.updatedUsername || state.username;
      state.email = action.payload.updatedEmail || state.email;
      state.image = action.payload.updatedImage || action.image;
    },

    signOut(state, action) {
      state.loggedIn = false;
      state.token = "token.is.here";
      state.username = "username";
      state.email = "";
      state.image = null;
    },
  },
});

export const { loadUserData, signOut, updateUserData } = userSlice.actions;
export default userSlice.reducer;
