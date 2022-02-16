import React from 'react';

type PageNumberProps = {
  pageCount: number;
  postCount: number;
  pageNumberBtnClick: (go: number) => void;
}

function PageNumber({ pageCount, postCount, pageNumberBtnClick }: PageNumberProps) {
  const pageArr = [];

  for (let i = 1; i <= Math.ceil(pageCount / postCount); i++) {
    pageArr.push(i);
  }

  function clickHandler(num: number) {
    pageNumberBtnClick(postCount * num);
  }

  return (
    <div className='page-number-container'>
			{pageArr.map((num, idx) => (
        <div key={idx} onClick={() => clickHandler(num)}>{num}</div>
      ))}
    </div>
  );
}

export default PageNumber;
