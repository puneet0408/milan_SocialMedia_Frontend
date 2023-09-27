import { CreateSlice } from "@reduxjs/toolkit";

const FeedCollections = CreateSlice({
  name: "feeds",
  initialState: {
    feeds: [],
    loading: false,
    error: null,
  },
  reducers: {
    getfeeds: (state, action) => {
      state.feeds = action.payload;
    },
    loadingState: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { getfeeds, loadingState } = FeedCollections.actions;
export default FeedCollections.reducer;
