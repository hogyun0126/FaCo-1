import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../modules';
import SearchBar from './boardComponent/searchBar';
import PageNumber from './boardComponent/pageNumber';
import QPost from './boardComponent/qPost';
import { postType } from '../modules/posts';

function QBoard() {
  const state = useSelector((state: RootState) => state.postsReducer.qLts);
  const [lts, setLts] = useState(state);

  const postCount = 3; // 페이지당 보여줄 개수
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(postCount);
  
  function searchHandler(posts: postType[]) {
    setLts(posts);
  }

  function pageNumberBtnClick(go: number): void {
    setStart(go - postCount);
    setEnd(go);
  }

  return (
    <div className='qboard-container'>
			<SearchBar searchHandler={searchHandler} boardType='qLts'/>
      
      <h1>질문 게시판</h1>

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
          {lts.slice(start, end).map(post => <QPost key={post.id} post={post} />)}
        </tbody>
      </table>

      <PageNumber pageCount={lts.length} postCount={postCount} pageNumberBtnClick={pageNumberBtnClick} />
    </div>
  );
}

export default QBoard;
