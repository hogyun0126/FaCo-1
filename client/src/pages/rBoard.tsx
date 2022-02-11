import React from 'react';
import SearchBar from './boardComponent/searchBar';
import LatestPost from './boardComponent/latestPost';
import PageNumber from './boardComponent/pageNumber';
import { boardDummy } from '../dummyData/boardDummy'; // 게시판 들어오면 전체 게시글을 받아옴

function RBoard() {
  const rBoardDummy = boardDummy.post.filter(x => x.boardType === 'r'); // r board용 더미 필터
  const popularPostArr = popularPost();
  const latestPostArr = latestPost();

  // 인기는 고정 검색 x
  function popularPost() {
    const sortArr = rBoardDummy
      .slice()
      .sort((a, b) => {
        if (typeof a.like === 'number' && typeof b.like === 'number') {
          if (a.like === b.like) {
            return a.createdAt > b.createdAt ? -1 : 1;
          } else {
            return a.like > b.like ? -1 : 1;
          }
        } else {
          return 1;
        }
      })
      .slice(0,3);
    // console.log(rBoardDummy)
    // console.log(sortArr)
    return sortArr;
  }

  function latestPost() {
    const sortArr = rBoardDummy
      .slice()
      .sort((a, b) => {
        return a.createdAt > b.createdAt ? -1 : 1;
      });

    //페이지 당 12개 까지 이상은 2페이지로
    return sortArr;
  }

  return (
    <div>
      <SearchBar />

      <div>
        <p>인기 게시글</p>
        <div className='rboard-popular-container'>
          {popularPostArr.map((item, idx) => (
            <div key={idx}>
              <img className='board-img' src={item.img} />
              <div>{item.title}</div>
            </div>      
          ))}
        </div>
      </div>

      <LatestPost />

      <PageNumber />
    </div>
  );
}

export default RBoard;
