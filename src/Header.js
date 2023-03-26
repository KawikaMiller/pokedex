import React from 'react'

// import Container from 'react-bootstrap/Container'

class Header extends React.Component {
  constructor(props){
    super(props);

    this.state = {

    }
  }

  render(){
    return(
      <section id='header'>
        <h4>Pokedex App</h4>
        <div id='pokeball_button_outer'></div>
      </section>
    )
  }
}

export default Header;