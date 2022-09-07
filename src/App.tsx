import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './container/LandingPage';
import ParkingSpace from './container/ParkingSpace';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>

          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/parkspcae' element={<ParkingSpace />} />

          </Routes>
        </BrowserRouter>

      </Provider>
    </div>
  );
}

export default App;
