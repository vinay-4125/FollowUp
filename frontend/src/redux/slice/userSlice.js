import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  accessToken: "",
};

export const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserLocalStorage: (state, action) => {
      const { user, token } = action.payload;
      localStorage.setItem("user", JSON.stringify({ user }));
      localStorage.setItem("token", JSON.stringify({ token }));
      state.user = user;
      state.accessToken = token;
    },
    deleteUserLocalStorage: (state) => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      state.user = null;
      state.accessToken = "";
    },
    updateUserLocalStorage: (state, action) => {
      const user = action.payload;
      localStorage.setItem("user", JSON.stringify({ user }));
      state.user = { ...state.user, user };
    },
    updateUserProfileToLocalStorage: (state, action) => {
      const profilePicture = action.payload;
      const dataFromLocalStorage = JSON.parse(localStorage.getItem("user"));
      console.log(dataFromLocalStorage);
      const updatedData = { ...dataFromLocalStorage.user, profilePicture };
      console.log(updatedData);
      localStorage.setItem("user", JSON.stringify(updatedData));
      state.user = updatedData;
    },
  },
});

export const {
  setUserLocalStorage,
  deleteUserLocalStorage,
  updateUserLocalStorage,
  updateUserProfileToLocalStorage,
} = userSlice.actions;
export default userSlice.reducer;
