import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../modules';

import SearchBar from './boardComponent/searchBar';
import PageNumber from './boardComponent/pageNumber';
import RPost from './boardComponent/rPost';
import { postType } from '../modules/posts';
import { NavLink } from 'react-router-dom';
import { postDummy } from '../dummyData/boardDummy';
import PostView from './postView';

function RBoard() {
  const state = useSelector((state: RootState) => state.postsReducer.rLts);
  const popular = state.slice().sort((a, b) => a.like > b.like ? -1 : 1).slice(0, 3);
  const [lts, setLts] = useState(state);

  const postCount = 3; // 페이지당 보여줄 개수
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(postCount);
  const [currentPost, setCurrentPost] = useState<postType>(postDummy.qLts[0]);
  const [isPostClicked, setIspostClicked] = useState(false);

  useEffect(() => searchHandler(state), []);

  function pageNumberBtnClick(go: number): void {
    setStart(go - postCount);
    setEnd(go);
  }

  function searchHandler(posts: postType[]): void {
    setLts(posts);
  }

  function postClickHandler(post: postType) {
    setCurrentPost(post);
    setIspostClicked(true);
  }
  
  return (
    <div>
      <SearchBar searchHandler={searchHandler} pageNumberBtnClick={pageNumberBtnClick} boardType={'rLts'} postCount={postCount} />

      <h1>추천 게시판</h1>

      <div>
        <h1>인기 게시글</h1>
        <div className='rboard-container'>
          {popular.map((post, idx) => <RPost key={post.id} post={post} postClickHandler={postClickHandler} />)}
        </div>
      </div>

      <div>
        <h1>최근 게시글</h1>
        <div className='rboard-container'>
          {lts.slice(start, end).map((post, idx) => <RPost key={post.id} post={post} postClickHandler={postClickHandler} />)}
        </div>
      </div>

      <NavLink to='/rPostEditor'>
        <button>글쓰기</button>
      </NavLink>

      <PageNumber pageCount={lts.length} postCount={postCount} pageNumberBtnClick={pageNumberBtnClick} />
      {
        isPostClicked &&
          <div>
            <PostView post={currentPost} />
          </div>
      }
    </div>
  );
}

export default RBoard;
