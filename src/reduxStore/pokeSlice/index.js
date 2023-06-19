import { createSlice } from "@reduxjs/toolkit";

const pokeSlice = createSlice({
  name: 'pokemon',
  initialState: {
    searchInput: '',
    pokemon: undefined,
    showShiny: false,
    formIdx: 0,
  },
  reducers: {
    handleSearchInputChange(state, action){
      state.searchInput = action.payload
    },
    setPokemon(state, action){
      console.log('setting pokemon in state!')
      state.pokemon = action.payload.pokemon;
    },
    toggleShiny(state, action){
      state.showShiny = action.payload;
    },
    changeFormIdx(state, action){
      state.formIdx = action.payload;
    },
    modifyProperty(state, action){
      state.pokemon[action.payload.property] = action.payload.value;
    }
  }
})

export default pokeSlice;