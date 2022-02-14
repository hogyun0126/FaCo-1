import { ChangeEvent, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from '../../modules';
import { RBoardPost } from '../../modules/posts';

type searchBarProps = {
  ltsHandler: (posts: RBoardPost[]) => void;
}

function SearchBar({ ltsHandler }: searchBarProps) {
  const selectList: string[] = ['location', 'weather', 'title', 'writer'];
  const [selected, setSelected] = useState('location');
  const [inputValue, setInputValue] = useState('');
  const state = useSelector((state: RootState) => state.postsReducer.rLts);

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

  function handleBtnClick() {
    // 검색 기능 누르면 상태 갱신 (멀로 필터할건지 변수 - 위치,작성자,날짜등) rlts
    const filterdPost = state
      .filter(post => {
        const data = post[selected];
        if (typeof data === 'string') {
          return data.includes(inputValue);
        }
      });
    
    ltsHandler(filterdPost);
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
