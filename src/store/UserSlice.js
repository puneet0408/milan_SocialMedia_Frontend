import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    Login: (state, action) => {
      state.user = action.payload;
    },
    Logout: (state) => {
      state.user = null;
    },
  },
});

export const {Logout , Login} = userSlice.actions;
export default userSlice.reducer;
