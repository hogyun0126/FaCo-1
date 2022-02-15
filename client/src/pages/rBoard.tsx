import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../modules';

import SearchBar from './boardComponent/searchBar';
import PageNumber from './boardComponent/pageNumber';
import RPost from './boardComponent/rPost';
import { postType } from '../modules/posts';

function RBoard() {
  const state = useSelector((state: RootState) => state.postsReducer.rLts);
  const popular = state.slice().sort((a, b) => a.like > b.like ? -1 : 1).slice(0, 3);
  const [lts, setLts] = useState(state);

  useEffect(() => searchHandler(state), []);

  function searchHandler(posts: postType[]): void {
    setLts(posts);
  }
  
  return (
    <div>
      <SearchBar searchHandler={searchHandler} boardType={'rLts'}/>

      <div>
        <p>인기 게시글</p>
        <div className='rboard-container'>
          {popular.map((post, idx) => <RPost key={post.id} post={post} />)}
        </div>
      </div>

      <div>
        <p>최근 게시물</p>
        <div className='rboard-container'>
          {lts.map((post, idx) => <RPost key={post.id} post={post} />)}
        </div>
      </div>

      <PageNumber />
    </div>
  );
}

export default RBoard;
