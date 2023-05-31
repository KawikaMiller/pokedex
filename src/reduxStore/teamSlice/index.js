import { createSlice } from "@reduxjs/toolkit";

const teamSlice = createSlice({
  name: 'team',
  initialState: {
    name: 'missingName',
    roster: [],
    showTypeChart: false,
  },
  reducers: {
    setTeamsName(state, action){
      state.name = action.payload
    },
    addToRoster(state, action){
      state.roster = [...state.roster, action.payload];
    },
    removeFromRoster(state, action){
      state.roster = state.roster.filter((pokemon, idx) => idx !== action.payload);
    },
    clearRoster(state, action){
      state.roster = action.payload.pokemon;
    },
    overwriteRoster(state, action){
      state.roster = action.payload.pokemon;
    },
    modifyMemberProperty(state, action){
      state.roster[action.payload.idx][action.payload.property] = action.payload.value;
    },
    toggleTypeChart(state, action){
      state.showTypeChart = !state.showTypeChart;
    }
  }
})

export default teamSlice;