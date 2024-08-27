// eslint-disable-next-line import/no-extraneous-dependencies
import { configureStore } from "@reduxjs/toolkit";

import exampleReducer from "./slicers/exampleSlice";

export default configureStore({
  reducer: { example: exampleReducer },
});
