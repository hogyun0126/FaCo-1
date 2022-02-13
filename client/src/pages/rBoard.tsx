import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules';
import { rBoardPopular, rBoardLts, qBoardLts } from '../modules/posts';

import SearchBar from './boardComponent/searchBar';
import PageNumber from './boardComponent/pageNumber';

function RBoard() {

  
  return (
    <div>
      <SearchBar />

      <div>
        <p>인기 게시글</p>
        <div className='rboard-popular-container'>
          
        </div>
      </div>


      <PageNumber />
    </div>
  );
}

export default RBoard;
