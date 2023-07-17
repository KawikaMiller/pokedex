import React from 'react'

// import Container from 'react-bootstrap/Container'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faInstagram, faLinkedin} from '@fortawesome/free-brands-svg-icons'
import { faCode, faAddressCard } from '@fortawesome/free-solid-svg-icons'

function Footer(props) {
  
    return(
      <section id='footer'>
        <div id='pokeball_button_footer'></div>
        <div id='footer_contact'>
          <div id='footer_socials'>
            <div>
              <a href='https://www.github.com/KMArtwork'>
                <FontAwesomeIcon 
                  icon={faGithub} 
                  size="2x" />
              </a>
              <p>GitHub</p>
            </div>
            <div>
              <a href='https://www.github.com/KMArtwork/pokedex'>
                <FontAwesomeIcon 
                  icon={faCode} 
                  size="2x" />
              </a>
              <p>Repository</p>              
            </div>
            <div>
              <a href='https://www.linkedin.com/in/kawikamiller/'>
                <FontAwesomeIcon
                  icon={faLinkedin}
                  size="2x" />
              </a>
              <p>LinkedIn</p>              
            </div>
            <div>
              <a href='https://www.instagram.com/k.m__art/'>
                <FontAwesomeIcon
                  icon={faInstagram}
                  size="2x" />
              </a>
              <p>Instagram</p>
            </div>
            <div>
              <a href='https://kmartwork.github.io/portfolio/'>
                <FontAwesomeIcon
                  icon={faAddressCard}
                  size="2x" />
              </a>
              <p>Portfolio</p>
            </div>




          </div>       
        </div>
      </section>
    )

}

export default Footer;