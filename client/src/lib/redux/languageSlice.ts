import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LanguageState {
  currentLanguage: "en" | "ar";
  direction: "ltr" | "rtl";
}

const initialState: LanguageState = {
  currentLanguage: "en",
  direction: "ltr",
};

export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<"en" | "ar">) => {
      state.currentLanguage = action.payload;
      state.direction = action.payload === "ar" ? "rtl" : "ltr";
      // When language changes, update the document's direction
      if (typeof document !== "undefined") {
        document.documentElement.dir = state.direction;
      }
    },
    // You could add more reducers here if needed, like toggleDirection
  },
});

export const { setLanguage } = languageSlice.actions;

export default languageSlice.reducer;
