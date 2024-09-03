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
      state.articles = action.payload.articles;
    },

    likeArticle(state, action) {
      state.articles.map((article) => {
        if (article.slug === action.payload.slug) {
          article.favorited = true;
          article.favoritesCount += 1;
        }
        return article;
      });
    },

    unlikeArticle(state, action) {
      state.articles.map((article) => {
        if (article.slug === action.payload.slug) {
          article.favorited = false;
          article.favoritesCount -= 1;
        }
        return article;
      });
    },

    createArticle(state, action) {
      state.articles.unshift(action.payload.article);
    },

    updateArticle(state, action) {
      state.articles.map((article) => {
        if (article.slug === action.payload.article.slug) {
          const articleIndex = state.articles.findIndex(
            (value) => value.slug === action.payload.article.slug
          );

          if (articleIndex !== -1) state.articles[articleIndex] = action.payload.article;
        }
        return article;
      });
    },

    removeArticle(state, action) {
      state.articles = state.articles.filter(
        (article) => article.slug !== action.payload.slug
      );
    },

    changePage(state, action) {
      state.articles = action.payload.newArticles;
    },
  },
});

export const {
  loadArticles,
  changePage,
  likeArticle,
  unlikeArticle,
  createArticle,
  updateArticle,
  removeArticle,
} = articlesSlice.actions;
export default articlesSlice.reducer;
