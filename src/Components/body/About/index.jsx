import React, { useState } from "react";
import { Button } from "react-bootstrap";

function About(){

  const [idx, setIdx] = useState(0);

  return(
    <div id='about'>
      
      <div id='about_categories'>
        <Button onClick={() => setIdx(0)}>General</Button>
        <Button onClick={() => setIdx(1)}>How To</Button>
        <Button onClick={() => setIdx(2)}>Misc.</Button>
        {/* <Button onClick={() => setIdx(3)}>Contact Me</Button> */}
      </div>
      <div id='about_content'>
          {
            idx === 0 ?
            <>
              <p>
                Hello, Trainer! Thank you for using my app, Pokedex Plus! My name is Kawika Miller and I'm a software developer, digital artist, and pokemon enjoyer. I created this app after a few months of hard work so I hope you're enjoying it and finding it useful.              
              </p>
              <br/>
              <p>
                If you're a fellow software developer or someone who enjoys coding, feel free to check out the <a href='https://github.com/KMArtwork/pokedex' target="_blank" rel="noreferrer">repository</a> for this project. It was primarily built using the MERN stack along with Redux Toolkit for state management. If you have any questions &/o feedback for me, feel free to use the 'Contact Me' page to send me an email!          
              </p>            
            </>
            :
            idx === 1 ?
              <p>
                Coming soon!
              </p>
            :
            idx === 2 ?
              <>
                <p>
                  You may have noticed a small quirk about this app already - your initial search might seem as though it's loading forever - but there's a reason for this! The server for this app is deployed on a free-tier service so if there is no activity on the app after a certain amount of time the server will spin down. This means that if the server is down and you search for a Pokemon, the server will need a few moments to spin back up before it responds with any information. Once the server is up and running, any subsequent request will behave normally! I apologize for this little quirk but unfortunately I cannot afford to pay for non-free-tier server at the moment.
                </p>
              <br/>
              </>
            :
            // idx === 3 ?
            // 'contact me'
            // :
            null
          }         
      </div>
      
    </div>
  )
  
}

export default About;