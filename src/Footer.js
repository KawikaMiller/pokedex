import React from 'react'

// import Container from 'react-bootstrap/Container'

class Footer extends React.Component {
  constructor(props){
    super(props);

    this.state = {

    }
  }

  render(){
    return(
      <section id='footer'>
        <div id='pokeball_button_footer'></div>
        <h5>Author: Kawika Miller | github.com/KMArtwork</h5>
      </section>
    )
  }
}

export default Footer;