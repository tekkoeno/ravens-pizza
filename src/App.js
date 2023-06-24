import './scss/app.scss';

import Header from './components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';

import { Route, Routes } from 'react-router-dom';
import { createContext, useState } from 'react';

export const SearchContext = createContext({});

function App() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="App">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <div className="wrapper">
          <Header />
          <div className="content">
            <div className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/cart" element={<Cart />} />
              </Routes>
            </div>
          </div>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
