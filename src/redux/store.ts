import { configureStore } from "@reduxjs/toolkit";
import testsSlice from "./slices/tests"
export const store = configureStore({
  reducer: {
    tests: testsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
