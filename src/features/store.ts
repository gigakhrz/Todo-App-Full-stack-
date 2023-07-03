import { configureStore } from "@reduxjs/toolkit";

import darkModeSlice, { Dark } from "./darkModeSlice";

const store = configureStore({
  reducer: {
    lightMode: darkModeSlice,
  },
});

export type RootState = {
  lightMode: Dark;
};

export default store;
