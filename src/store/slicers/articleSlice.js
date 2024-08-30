/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const articleSlice = createSlice({
  name: "article",
  initialState: {
    article: {
      slug: "",
      title: "",
      description: "",
      body: "",
      createdAt: "2024-08-22",
      updatedAt: "2024-08-01",
      tagList: [],
      favorited: false,
      favoritesCount: 0,
      author: {
        username: "",
        bio: "",
        image: "",
        following: false,
      },
    },
  },

  reducers: {
    loadArticle(state, action) {
      state.article = action.payload.article;
    },
  },
});

export const { loadArticle } = articleSlice.actions;
export default articleSlice.reducer;
