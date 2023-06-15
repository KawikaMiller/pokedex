import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: undefined,
    userId: undefined,
    isLoggedIn: false,
  },
  reducers: {
    userLogin(state, action){
      state.username = action.payload.username;
      state.userId = action.payload.id;
      state.isLoggedIn = true;
    },
    userLogout(state, action){
      state.username = undefined;
      state.userId = undefined;
      state.isLoggedIn = false;
    }
  }
})

export default userSlice;