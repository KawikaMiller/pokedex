import React from "react";
import { useSelector } from "react-redux";
// import itemsSlice from "../../../reduxStore/itemsSlice";

// import ItemInfo from "../ItemInfo";
import ItemCategories from "../ItemCategories";
import ItemCard from "../ItemCard";

function ItemTab(){

  const itemsState = useSelector(state => state.items);

  return(
    <div id='itemTabOuter'>

      <ItemCategories />

      <div id='itemTabCards'>

      {itemsState.categoryItems.map(item => <ItemCard item={item}/> )}

      </div>

    </div>
  )

}

export default ItemTab;