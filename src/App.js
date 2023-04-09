import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import ReactDOM from 'react-dom';

import Main from './Main';
import Header from './Header';
import Footer from './Footer';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { findDOMNode } from 'react-dom';

const transitionHeader = () => {
  const header = document.getElementById('header');
  const footer = document.getElementById('footer');
  const main = document.getElementById('main');
  const pokeballButton = document.getElementById('pokeball_button_outer');
  const pokeballButtonFooter = document.getElementById('pokeball_button_footer');
  if (header.className === 'blarg' && footer.className === 'blarg' && main.className === 'blargMain') {
    header.className = '';
    footer.className = '';
    pokeballButton.className = '';
    pokeballButtonFooter.className = '';

    // footer.style.height = '150px';
    // setTimeout(() => {
    //   footer.className = '';
    // }, 2000)
    
    main.className = '';
  } else {
    header.className = 'blarg';
    footer.className = 'blarg';
    pokeballButton.className = 'blarg';
    pokeballButtonFooter.className = 'blarg';
    main.className = 'blargMain';
  }
}

function App() {
  return (
    <div className="App">
      <Header transitionHeader={transitionHeader} />
      <BrowserRouter>
        <main id='main'>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/new' element={<p>test</p>} />
          </Routes>
        </main>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
