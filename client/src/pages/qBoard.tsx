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
  
  function searchHandler(posts: postType[]) {
    setLts(posts);
  }

  return (
    <div>
			<SearchBar searchHandler={searchHandler} boardType='qLts'/>
      
      <div>
        <div>
          <p>[위치/날씨]</p>
          <p>제목</p>
          <p>글쓴이</p>
          <p>일시</p>
          <p>좋아요</p>
        </div>
        {lts.map(post => <QPost key={post.id} post={post} />)}
      </div>

      <PageNumber />
    </div>
  );
}

export default QBoard;
