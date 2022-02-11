import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Menu from './pages/menu';
import Footer from './pages/footer';
import Home from './pages/home';
import QBoard from './pages/qBoard';
import RBoard from './pages/rBoard';

import ReduxTest from './pages/reduxTest';

function App() {
  return (
    <BrowserRouter>
      <div className='app-container'>
        <header className='app-header'>
          <Menu></Menu>
        </header>

        {/*<section><ReduxTest /></section>*/}

        <section className='section'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/qBoard' element={<QBoard />} />
            <Route path='/rBoard' element={<RBoard />} />
          </Routes>
        </section>

        <footer className='app-footer'>
          <Footer></Footer>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
