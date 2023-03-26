import './css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './Main';
import Header from './Header';
import Footer from './Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <main>
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
