import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    user: localStorage.getItem("token") ? localStorage.getItem("token") : null,
    profile: null,
  },
  reducers: {
    LoginFun: (state, action) => {
      state.user = action.payload;
    },
    Logout: (state) => {
      state.user = null;
      state.profile = null;
    },
    profileFun: (state, action) => {
      state.profile = action.payload;
    },
  },
});

export const { Logout, LoginFun, profileFun } = UserSlice.actions;
export default UserSlice.reducer;
