import { configureStore } from "@reduxjs/toolkit";
import dialoguesReducer from "./dialoguesSlice";

export const store = configureStore({
  reducer: {
    dialogues: dialoguesReducer,
  },
});
