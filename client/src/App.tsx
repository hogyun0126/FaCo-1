import React, { useEffect }  from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Menu from './pages/menu';
import Footer from './pages/footer';
import Home from './pages/home';
import QBoard from './pages/qBoard';
import RBoard from './pages/rBoard';
import PostEditor from './pages/qPostEditor';


// import ReduxTest from './pages/reduxTest';
import { useDispatch, useSelector } from 'react-redux';
import { postDummy } from './dummyData/boardDummy';
import { locationDummy } from './dummyData/location';
import { RootState } from './modules';
import { rBoardLts, qBoardLts } from './modules/posts';
import { locationLts } from './modules/location';
import PostView from './pages/postView';
import RPostEditor from './pages/rPostEditor';
import QPostEditor from './pages/qPostEditor';
function App() {
  const state = useSelector((state: RootState) => state.postsReducer);
  const dispatch = useDispatch();

  useEffect(func, []);
  
  function func() {
    dispatch(rBoardLts(postDummy.rLts));
    dispatch(qBoardLts(postDummy.qLts));
    dispatch(locationLts(locationDummy.selectLocation));
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
            <Route path='/qPostEditor' element={<QPostEditor />} />
            <Route path='/rPostEditor' element={<RPostEditor />} />
          </Routes>
        </section>
      </div>
      <footer className='app-footer'>
          <Footer></Footer>
      </footer>
    </BrowserRouter>
  );
}

export default App;
