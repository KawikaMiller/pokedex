import { createSlice } from "@reduxjs/toolkit";

const itemsSlice = createSlice({
  name: 'items',
  initialState: {
    allPockets: [],
    activeCategory:'',
    activeItem: {},
    categoryItems: [],
  },
  reducers: {
    setAllPockets(state, action){
      state.allPockets = action.payload;
      state.allPockets.sort((a,b) => {
        if(a.name > b.name){
          return 1
        } else if (a.name < b.name) {
          return -1
        } else return 0
      })
    },
    setCategoryItems(state, action){
      state.categoryItems = action.payload
    },
  }
})

export default itemsSlice;