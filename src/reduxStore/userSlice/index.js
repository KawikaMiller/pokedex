import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: 'missingUser',
    userId: undefined,
    isLoggedIn: false,
  },
  reducers: {
 
  }
})

export default userSlice;