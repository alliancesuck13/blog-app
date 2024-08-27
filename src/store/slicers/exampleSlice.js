// eslint-disable-next-line import/no-extraneous-dependencies
import { createSlice } from "@reduxjs/toolkit";

const exampleSlice = createSlice({
  name: "example",
  initialState: {
    examples: [],
  },

  reducers: {
    todoSomething(state, action) {
      state.examples.push({
        id: new Date().toISOString(),
        text: action.payload.text,
      });
    },
  },
});

export const { addSomething } = exampleSlice.actions;
export default exampleSlice.reducer;
