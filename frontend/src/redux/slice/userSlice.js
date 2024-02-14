import { createSlice } from "@reduxjs/toolkit";

// const userToken =

const initialState = {
  userInfo: {},
  userToken: "",
};

export const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.userInfo = action.payload;
    },
    deleteItem: (state) => {
      state.userInfo = {};
    },
  },
});

export const { addItem, deleteItem } = userSlice.actions;
export default userSlice.reducer;
