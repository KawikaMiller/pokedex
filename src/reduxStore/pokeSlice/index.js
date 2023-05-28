import { createSlice } from "@reduxjs/toolkit";

const pokeSlice = createSlice({
  name: 'pokemon',
  initialState: {
    searchInput: '',
    pokemon: {}
  },
  reducers: {
    handleSearchInputChange(state, action){
      console.log('HANDLE SEARCH: ', action.payload)
      state.searchInput = action.payload
    },
    setPokemon(state, action){
      console.log('setPokemon reducer hit', action.payload)
      state.pokemon = action.payload.pokemon;
    }
  }
})

export default pokeSlice;