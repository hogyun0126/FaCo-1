import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../modules';

import SearchBar from './boardComponent/searchBar';
import PageNumber from './boardComponent/pageNumber';
import RPost from './boardComponent/rPost';
import { PostType } from '../modules/posts';
import { NavLink } from 'react-router-dom';
import { postDummy } from '../dummyData/boardDummy';
import PostView from './postView';
import axios from 'axios';

function RBoard() {
  const state = useSelector((state: RootState) => state.postsReducer.rLts);
  const popular = state.slice().sort((a, b) => a.like > b.like ? -1 : 1).slice(0, 3);
  const [lts, setLts] = useState(state);

  const postCount = 3; // 페이지당 보여줄 개수
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(postCount);
  const [currentPost, setCurrentPost] = useState<PostType>(postDummy.rLts[0]);
  const [isPostClicked, setIspostClicked] = useState(false);

  useEffect(() => {
    async function callback() {
      //axios.get()
    }
    searchHandler(state)}
  , []);

  function pageNumberBtnClick(go: number): void {
    setStart(go - postCount);
    setEnd(go);
  }

  function searchHandler(posts: PostType[]): void {
    setLts(posts);
  }

  function postClickHandler(post: PostType) {
    setCurrentPost(post);
    setIspostClicked(true);
  }

  function handleModalBackgroundClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (e.target === e.currentTarget) {
      setIspostClicked(false);
    }
  }
  
  return (
    <div>
      <div className='rboard-header'>
        <div>추천 게시판</div>
        <SearchBar searchHandler={searchHandler} pageNumberBtnClick={pageNumberBtnClick} boardType={'rLts'} postCount={postCount} />
      </div>
      <div>
        <div>인기 TOP3</div>
        <div className='rboard-container'>
          {popular.map((post, idx) => <RPost key={post.id} post={post} postClickHandler={postClickHandler} />)}
        </div>
      </div>

      <div>
        <div>최근 게시글</div>
        <div className='rboard-container'>
          {lts.slice(start, end).map((post, idx) => <RPost key={post.id} post={post} postClickHandler={postClickHandler} />)}
        </div>
      </div>

      <NavLink to='/postEditor' state={{boardType: 'r'}}>
        <button className='board-write-btn'>글쓰기</button>
      </NavLink>

      <PageNumber pageCount={lts.length} postCount={postCount} pageNumberBtnClick={pageNumberBtnClick} />
      {
        isPostClicked &&
          <div onClick={(e)=>{handleModalBackgroundClick(e)}} className='rboard-postview-modal-background'>
            <div className='rboard-postview-modal'>
              <PostView post={currentPost} />
            </div>
          </div>
      }
    </div>
  );
}

export default RBoard;
