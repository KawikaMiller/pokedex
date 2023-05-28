import { createSlice } from "@reduxjs/toolkit";

const teamSlice = createSlice({
  name: 'team',
  initialState: {
    name: 'missingName',
    roster: [],
  },
  reducers: {
    setTeamName(state, action){
      state.searchInput = action.payload
    },
    addToRoster(state, action){
      state.pokemon = action.payload.pokemon;
    },
    removeFromRoster(state, action){
      state.pokemon = action.payload.pokemon;
    },
    clearRoster(state, action){
      state.pokemon = action.payload.pokemon;
    },
  }
})

export default teamSlice;