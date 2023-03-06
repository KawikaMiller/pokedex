import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './Main';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header>
        Pokedex App
      </header>
      <BrowserRouter>
        <main>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/new' element={<p>test</p>} />
          </Routes>
        </main>
      </BrowserRouter>
      <footer>
        Author: Kawika Miller | github.com/KMArtwork
      </footer>
    </div>
  );
}

export default App;
