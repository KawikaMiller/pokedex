import { createSlice } from "@reduxjs/toolkit";

const teamSlice = createSlice({
  name: 'team',
  initialState: {
    teamName: 'missingName',
    id: undefined,
    roster: [],
    fetchedTeams: [],
    showTypeChart: false,
    showLoadedTeams: false,
    showSaveTeam: false,
  },
  reducers: {
    setTeamsName(state, action){
      state.teamName = action.payload
    },
    addToRoster(state, action){
      state.roster = [...state.roster, action.payload];
    },
    removeFromRoster(state, action){
      state.roster = state.roster.filter((pokemon, idx) => idx !== action.payload);
    },
    clearRoster(state, action){
      state.roster = [];
    },
    overwriteRoster(state, action){
      state.roster = action.payload;
    },
    modifyMemberProperty(state, action){
      state.roster[action.payload.idx][action.payload.property] = action.payload.value;
    },
    toggleTypeChart(state, action){
      state.showTypeChart = !state.showTypeChart;
    },
    setFetchedTeams(state, action){
      state.fetchedTeams = action.payload;
    },
    toggleLoadedTeams(state, action){
      state.showLoadedTeams = !state.showLoadedTeams;
    },
    toggleSaveTeam(state, action){
      state.showSaveTeam = !state.showSaveTeam;
    },
    setRoster(state, action){
      state.id = action.payload._id;
      state.roster = action.payload.pokemon;
      state.teamName = action.payload.teamName;
    }
  }
})

export default teamSlice;