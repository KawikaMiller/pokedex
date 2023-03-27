import React from 'react'

// import Container from 'react-bootstrap/Container'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faInstagram, faLinkedin} from '@fortawesome/free-brands-svg-icons'

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
        <div id='footer_contact'>
          <div id='footer_socials'>
            <a href='https://www.github.com/KMArtwork'>
              <FontAwesomeIcon 
                icon={faGithub} 
                size="2x" />
            </a>
            <a href='https://www.linkedin.com/in/kawikamiller/'>
              <FontAwesomeIcon
                icon={faLinkedin}
                size="2x" />
            </a>
            <a href='https://www.instagram.com/k.m__art/'>
              <FontAwesomeIcon
                icon={faInstagram}
                size="2x" />
            </a>
          </div>       
        </div>
      </section>
    )
  }
}

export default Footer;