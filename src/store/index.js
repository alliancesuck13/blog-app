// eslint-disable-next-line import/no-extraneous-dependencies
import { configureStore } from "@reduxjs/toolkit";

import articlesReducer from "./slicers/articlesSlice";
import articleReducer from "./slicers/articleSlice";

export default configureStore({
  reducer: { articles: articlesReducer, article: articleReducer },
});
