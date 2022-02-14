import { ChangeEvent, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from '../../modules';
import { postType } from '../../modules/posts';

type searchBarProps = {
  searchHandler: (posts: postType[]) => void;
  boardType: string;
}

function SearchBar({ searchHandler, boardType }: searchBarProps) {
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
    
    searchHandler(filterdPost);
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
