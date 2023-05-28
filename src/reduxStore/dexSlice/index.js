import { createSlice } from "@reduxjs/toolkit";

const dexSlice = createSlice({
  name: 'pokedex',
  initialState: {
    activeScreen: 0,
    dexIdx: 0,
    moveIdx: 0,
    abilityIdx: 0,
  },
  reducers: {
    setActiveScreen(state, action){
      state.activeScreen = action.payload
    },
    setDexIdx(state, action){
      state.dexIdx = action.payload
    },
    setMoveIdx(state, action){
      state.moveIdx = action.payload
    },
    setAbilityIdx(state, action){
      console.log(action.payload)
      state.abilityIdx = action.payload
    }
  }
})

export default dexSlice;