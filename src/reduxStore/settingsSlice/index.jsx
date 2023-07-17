import { createSlice } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    theme: 'pokeball'
  },
  reducers: {
    setTheme(state, action){
      state.theme = action.payload
    }
  }
})

export default settingsSlice;