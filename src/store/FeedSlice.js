import { createSlice } from "@reduxjs/toolkit";

const FeedCollection = createSlice({
  name: "Feeds",
  initialState: {
    feeds: [],
    likes:"",
    loading: false,
    error: null,
  },
  reducers: {
    getFeeds: (state, action) => {
      state.feeds = action.payload;
    },
    loadingState: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { getFeeds, loadingState } = FeedCollection.actions;
export default FeedCollection.reducer;
