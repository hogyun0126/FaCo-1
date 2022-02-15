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

  const postCount = 3; // 페이지당 보여줄 개수
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(postCount);

  useEffect(() => searchHandler(state), []);

  function pageNumberBtnClick(go: number): void {
    setStart(go - postCount);
    setEnd(go);
  }

  function searchHandler(posts: postType[]): void {
    setLts(posts);
  }
  
  return (
    <div>
      <SearchBar searchHandler={searchHandler} boardType={'rLts'}/>

      <div>
        <h1>인기 게시글</h1>
        <div className='rboard-container'>
          {popular.map((post, idx) => <RPost key={post.id} post={post} />)}
        </div>
      </div>

      <div>
        <h1>최근 게시글</h1>
        <div className='rboard-container'>
          {lts.slice(start, end).map((post, idx) => <RPost key={post.id} post={post} />)}
        </div>
      </div>

      <PageNumber pageCount={lts.length} postCount={postCount} pageNumberBtnClick={pageNumberBtnClick} />
    </div>
  );
}

export default RBoard;
