import { configureStore } from "@reduxjs/toolkit";
import FeedSlice from "./FeedSlice";
import UserSlice from "./UserSlice";

export const store = configureStore({
  reducer: {
    user: UserSlice,
    feeds: FeedSlice,
  },
});
export default store;
