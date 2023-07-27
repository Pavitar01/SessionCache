import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    AddUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const { AddUser } = userSlice.actions;
export default userSlice.reducer;
