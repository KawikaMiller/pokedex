import { combineReducers } from "@reduxjs/toolkit";
import pokeSlice from "./pokeSlice";
import dexSlice from "./dexSlice";
import teamSlice from "./teamSlice";
import userSlice from "./userSlice";
import itemsSlice from "./itemsSlice";
import settingsSlice from "./settingsSlice";

const pokeReducer = combineReducers({
  pokemon: pokeSlice.reducer,
  pokedex: dexSlice.reducer,
  team: teamSlice.reducer,
  user: userSlice.reducer,
  items: itemsSlice.reducer,
  settings: settingsSlice.reducer,
})

export default pokeReducer;