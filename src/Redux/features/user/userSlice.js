import { createSlice } from "@reduxjs/toolkit";
import { getUserDetailsFromToken } from "../../../helpers/jwt";
import { isEmpty } from "lodash";

const initialState = {
  userData: {},
  tokens: { accessToken: "", refreshToken: "" },
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      const token = action?.payload;
      // set user data, token, isLoggedIn in global state
      if (!token) {
        console.log("token not found sent from Login Page");
        return;
      }
      state.userData = getUserDetailsFromToken(token);
      state.tokens.accessToken = token;
      state.isLoggedIn = !isEmpty(state.userData);
    },

    logoutUser: (state) => {
      state.userData = {};
      state.tokens = { accessToken: "", refreshToken: "" };
      state.isLoggedIn = false;
    },

    getUserData: (state, action) => {
      const token = action?.payload;
      // set user data, token, isLoggedIn in global state
      if (!token) {
        console.log("token not found sent from app.js, No Login");
        return;
      }
      state.userData = getUserDetailsFromToken(token);
      state.tokens.accessToken = token;
      state.isLoggedIn = !isEmpty(state.userData);
      console.log("Logged In");
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserData, getUserData, logoutUser } = userSlice.actions; // exporting accessToken action from userSlice

export default userSlice.reducer;
