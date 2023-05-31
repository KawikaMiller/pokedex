import { combineReducers } from "@reduxjs/toolkit";
import pokeSlice from "./pokeSlice";
import dexSlice from "./dexSlice";
import teamSlice from "./teamSlice";

const pokeReducer = combineReducers({
  pokemon: pokeSlice.reducer,
  pokedex: dexSlice.reducer,
  team: teamSlice.reducer
})

export default pokeReducer;