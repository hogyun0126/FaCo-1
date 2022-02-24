import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules';
import SearchBar from './boardComponent/searchBar';
import PageNumber from './boardComponent/pageNumber';
import QPost from './boardComponent/qPost';
import { PostType, qBoardLts } from '../modules/posts';
import { NavLink, Route, Routes } from 'react-router-dom';
import { postDummy } from '../dummyData/boardDummy';
import PostView from './postView';

function QBoard() {
  const state = useSelector((state: RootState) => state.postsReducer.qLts);
  const dispatch = useDispatch();
  const [lts, setLts] = useState(state);
  const postCount = 3; // 페이지당 보여줄 개수
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(postCount);
  const [isPostClicked, setIspostClicked] = useState(false);
  const [currentPost, setCurrentPost] = useState<PostType>(postDummy.qLts[0]);

  
  useEffect(() => {
    // 서버에서 새로 받아옴
    dispatch(qBoardLts(state));
  }, []);
  

  function searchHandler(posts: PostType[]) {
    setLts(posts);
  }

  function postClickHandler(post: PostType) {
    setCurrentPost(post);
    setIspostClicked(true);
  }

  function pageNumberBtnClick(go: number): void {
    setStart(go - postCount);
    setEnd(go);
  }

  return (
    <div className='qboard-container'>
			<SearchBar searchHandler={searchHandler} pageNumberBtnClick={pageNumberBtnClick} boardType='qLts' postCount={postCount}/>
      
      <h1>질문 게시판</h1>

      {isPostClicked && <PostView post={currentPost}/>}

      <table>
        <thead>
          <tr>
            <th>[위치/날씨]</th>
            <th>제목</th>
            <th>글쓴이</th>
            <th>일시</th>
            <th>좋아요</th>
          </tr>
        </thead>
        <tbody>
          {lts.slice(start, end).map(post => <QPost key={post.id} post={post} postClickHandler={postClickHandler} />)}
        </tbody>
      </table>

      <NavLink to='/postEditor' state={{boardType: 'q'}}>
        <button>글쓰기</button>
      </NavLink>

      <PageNumber pageCount={lts.length} postCount={postCount} pageNumberBtnClick={pageNumberBtnClick} />
    </div>
  );
}

export default QBoard;
