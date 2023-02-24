import React from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import Pokedex from "./Pokedex";

class Main extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      searchInput: '',
      searchResult: null,
      searchError: null,
    }
  }

  handleInputChange = (event) => {
    this.setState({
      searchInput: event.target.value.toLowerCase()
    })
  }

  handleSearch = async (event) => {
    event.preventDefault();
    this.setState({
      searchError: null
    })
    try {
      let request = {
        url: `https://pokeapi.co/api/v2/pokemon/${this.state.searchInput}`,
        method: 'GET'
      }

      let response = await axios(request);

      console.log(response.data);

      this.setState({
        searchResult: response.data
      })
    } catch (err) {
      console.log(err);
      this.setState({
        searchError: err
      })
    }
  }

  render() {
    return(
      <>
      <SearchBar handleSearch={this.handleSearch} handleInputChange={this.handleInputChange} />
      <Pokedex searchResult={this.state.searchResult} />
      </>
    )
  }
}

export default Main;