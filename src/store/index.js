// eslint-disable-next-line import/no-extraneous-dependencies
import { configureStore } from "@reduxjs/toolkit";

import articlesReducer from "./slicers/articlesSlice";

export default configureStore({
  reducer: { articles: articlesReducer },
});
