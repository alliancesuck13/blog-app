/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice } from "@reduxjs/toolkit";

const articlesSlice = createSlice({
  name: "articles",
  initialState: {
    articles: [],
  },

  reducers: {
    loadArticles(state, action) {
      action.payload.articles.forEach((article) => {
        state.articles.push(article);
      });
    },

    changePage(state, action) {
      state.articles = action.payload.newArticles;
      console.log("store ->", state.articles);
      console.log("actual articles ->", action.payload.newArticles);
    },
  },
});

export const { loadArticles, changePage } = articlesSlice.actions;
export default articlesSlice.reducer;
