import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Main from './Components/mainscreen/Main/Main';
import Header from './Components/mainscreen/Header/Header';
import Footer from './Components/mainscreen/Footer/Footer';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import pokeReducer from './reduxStore';

let pokeStore = configureStore({
  reducer: pokeReducer
})

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
    <Provider store={pokeStore}>
      <div className="App">
        <Header transitionHeader={transitionHeader} />
        <BrowserRouter>
          <main id='main'>
            <Routes>
              <Route path='/' element={<Main />} />
              <Route path='/new' element={<p>test</p>} />
              <Route path='/callback' element={<Main />} />
            </Routes>
          </main>
        </BrowserRouter>
        <Footer />
      </div>      
    </Provider>

  );
}

export default App;
