// dependencies
import React from "react";
// bootstrap components
import Container from "react-bootstrap/Container";
// my components & classes
import SearchBar from "./SearchBar";
import Pokedex from "./search_display/Pokedex";



function Main (props){
  
    return(
      <Container>
        <SearchBar />
        <Pokedex />
      </Container>
    )
}

export default Main;