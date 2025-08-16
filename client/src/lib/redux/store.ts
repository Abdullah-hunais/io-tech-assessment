import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "./languageSlice"; // Importing the language slice reducer
import searchReducer from "./searchSlice"; // We'll add this later for search functionality

export const store = configureStore({
  reducer: {
    language: languageReducer,
    search: searchReducer, // Placeholder for future search state
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {language: LanguageState, search: SearchState}
export type AppDispatch = typeof store.dispatch;
