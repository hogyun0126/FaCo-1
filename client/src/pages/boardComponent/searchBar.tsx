import { ChangeEvent, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from '../../modules';
import { PostType } from '../../modules/posts';

type searchBarProps = {
  searchHandler: (posts: PostType[]) => void;
  pageNumberBtnClick: (go: number) => void;
  boardType: string;
  postCount: number;
}

function SearchBar({ searchHandler, pageNumberBtnClick, boardType, postCount }: searchBarProps) {
  const selectList: string[] = ['location', 'weather', 'title', 'writer'];
  const [selected, setSelected] = useState('location');
  const [inputValue, setInputValue] = useState('');
  const state = useSelector((state: RootState) => state.postsReducer[boardType]);

  // select
  function handleSelectChange(e: ChangeEvent<HTMLSelectElement>) {
    // console.log(selected)
    setSelected(e.target.value);
  }

  // input
  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    //console.log(inputValue)
    setInputValue(e.target.value);
  }

  // 검색 버튼
  function handleBtnClick() {
    const filterdPost = state
      .filter(post => {
        const data = post[selected];
        if (typeof data === 'string') {
          const reg = new RegExp(inputValue, 'i');
          return reg.test(data);
        }
      });
    
    setInputValue('');
    searchHandler(filterdPost);
    pageNumberBtnClick(postCount);
  }

  return (
    <div className='searchbar-container'>
      <select onChange={handleSelectChange}>
        {selectList.map((item, idx) => (
          <option key={idx} value={item}>
            {item}
          </option>
        ))}
      </select>
      <input type='text' value={inputValue} onChange={handleInputChange} />
      <button className='board-write-btn' onClick={handleBtnClick}>검색</button>
    </div>
  );
}

export default SearchBar;
