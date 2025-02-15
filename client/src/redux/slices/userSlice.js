import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    token: "",
  },
  reducers: {
    signIn: () => {},
    signOut: () => {},
  },
});

export const { signIn, signOut } = userSlice.actions;

export default userSlice.reducer;
