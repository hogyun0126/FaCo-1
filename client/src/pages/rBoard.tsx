import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../modules';

import SearchBar from './boardComponent/searchBar';
import PageNumber from './boardComponent/pageNumber';
import RPost from './boardComponent/rPost';
import { RBoardPost } from '../modules/posts';

function RBoard() {
  const state = useSelector((state: RootState) => state.postsReducer.rLts);
  const popular = state.sort((a, b) => a.like > b.like ? -1 : 1).slice(0, 3);
  const [lts, setLts] = useState(state);
  
  function ltsHandler(posts: RBoardPost[]) {
    setLts(posts);
  }
  
  return (
    <div>
      <SearchBar ltsHandler={ltsHandler} />

      <div>
        <p>인기 게시글</p>
        {popular.map(post => <RPost key={post.id} post={post} />)}
      </div>

      <div>
        <p>최근 게시물</p>
        {lts.map(post => <RPost key={post.id} post={post}/>)}
      </div>

      <PageNumber />
    </div>
  );
}

export default RBoard;
