import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Dark {
  dark: boolean;
}

const initialState: Dark = {
  dark: false,
};

const darkModeSlice = createSlice({
  name: "lightMode",
  initialState,
  reducers: {
    setDark: (state, action: PayloadAction<boolean>) => {
      state.dark = action.payload;
    },
  },
});

export const { setDark } = darkModeSlice.actions;
export default darkModeSlice.reducer;
