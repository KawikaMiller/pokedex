import { combineReducers } from "@reduxjs/toolkit";
import pokeSlice from "./pokeSlice";

const pokeReducer = combineReducers({
  pokemon: pokeSlice.reducer
})

export default pokeReducer;