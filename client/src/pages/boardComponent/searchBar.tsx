import React, { ChangeEvent, useState } from 'react';
import { postDummy } from '../../dummyData/boardDummy'; // 게시판 들어오면 전체 게시글을 받아옴

function SearchBar() {
  const selectList = ['location', 'weather', 'title', 'writer'];
  const [selected, setSelected] = useState('location');
  const [inputValue, setInputValue] = useState('');


  // select
  function handleSelectChange(e: ChangeEvent<HTMLSelectElement>) {
    // console.log(selected)
    setSelected(e.target.value);
  }

  // input
  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    // console.log(inputValue)
    setInputValue(e.target.value);
  }

  function handleBtnClick() {
    //누르면 리덕스 상태 갱신 (멀로 필터할건지 변수 - 위치,작성자,날짜등)
  }

  return (
    <div>
      <select onChange={handleSelectChange}>
        {selectList.map((item, idx) => (
          <option key={idx} value={item}>
            {item}
          </option>
        ))}
      </select>
      <input type='text' onChange={handleInputChange} />
      <button onClick={handleBtnClick}>검색</button>
    </div>
  );
}

export default SearchBar;
