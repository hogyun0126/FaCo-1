import React, { useEffect }  from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Menu from './pages/menu';
import Footer from './pages/footer';
import Home from './pages/home';
import QBoard from './pages/qBoard';
import RBoard from './pages/rBoard';

// import ReduxTest from './pages/reduxTest';
import { useDispatch, useSelector } from 'react-redux';
import { postDummy } from './dummyData/boardDummy';
import { RootState } from './modules';
import { rBoardLts, qBoardLts } from './modules/posts';

function App() {
  const state = useSelector((state: RootState) => state.postsReducer);
  const dispatch = useDispatch();

  useEffect(func,[]);
  
  function func() {
    dispatch(rBoardLts(postDummy.rLts));
    dispatch(qBoardLts(postDummy.qLts));
  }

  return (
    <BrowserRouter>
      <div className='app-container'>
        <header className='app-header'>
          <Menu></Menu>
        </header>

        {/*<section><ReduxTest /></section>*/}
        {/*<button onClick={func}>test</button>*/}

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
