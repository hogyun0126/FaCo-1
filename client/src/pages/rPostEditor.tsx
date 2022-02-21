import React, { useEffect, useMemo, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useRef } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { postType, rBoardLts } from '../modules/posts';
import { useLocation, useNavigate } from 'react-router-dom';
import { RootState } from '../modules';
import { increaseKey } from '../modules/test';
import ImgForm from './boardComponent/imgForm';



type Location = {
  post: postType;
}

function RPostEditor () {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const location = useLocation();

  const key = useSelector((state: RootState) => state.testReducer.key); //test
  const state = useSelector((state: RootState) => state.postsReducer.qLts);

  const QuillRef = useRef<ReactQuill>();
  const [inputTitle, setInputTitle] = useState("");
  const [isTitleEmpty, setIsTitleEmpty] = useState(false);
  const locationState = location.state as Location;
  const [images, setImages] = useState<string[]>([]);

  let quill = QuillRef.current?.getEditor();

  useEffect(
    () => {
      quill = QuillRef.current?.getEditor();
      if (locationState !== null) {
        quill?.setContents(locationState.post.body);
        setInputTitle(locationState.post.title);
      }
    },
    []
  );

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ size: ["small", false, "large", "huge"] }, { color: [] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
            { align: [] },
          ]
        ]
      },
    }),
    []
  );

  function handleSubmitBtnClick() {
    if (inputTitle === '') {
      return setIsTitleEmpty(true);
    }

    const delta: any = quill?.getContents().ops;
    const updateState = state.slice();
      
    if (locationState.post === null) {
      console.log('신규')
      updateState.unshift({
        id: key,
        type: 'r',
        title: inputTitle,
        weather: '비',
        location: '부산',
        writer: 'lee',
        like: 5,
        createdAt: 20230101,
        body: delta,
        img: images
      });
      
      dispatch(increaseKey(key)); // dummy
    } else {
      console.log('수정')
      const idx = updateState.findIndex(el => el.id === locationState.post.id);
      updateState[idx] = {
        ...updateState[idx],
        body: delta,
        title: inputTitle,
      }
    }
    
    dispatch(rBoardLts(updateState));
    nav('/rBoard');
  }

  function inputTitleChange(e: React.ChangeEvent<HTMLInputElement> ) {
    setInputTitle(e.target.value);
    setIsTitleEmpty(false);
  }

  function handleImages(images: string[]) {
    setImages(images)
  }

  return (
    <div className='r-post-editor-container'>
      <div className='r-post-editor-img-form'>
        <ImgForm images={images} handleImages={handleImages} />
        {images && <img src={images[0]} />} {/*추후 넘어가게 구현할거임 밑에 미리보기랑 컴포넌트 새로하나 만듬 */}
      </div>

      <div className='r-post-editor-text-form-container'>
        <div className='post-editor-title-container'>
          <div>title</div>
          <input type='text' value={inputTitle} onChange={(e) => inputTitleChange(e)} />
        </div>

        <ReactQuill
          className='post-editor-quill'
          ref={(element) => {
            if (element !== null) {
              QuillRef.current = element;
            }
          }}
          modules={modules}
          theme='snow'
        />
        <div>

          <div className='post-editor-submit-container'>
            {isTitleEmpty && <p>제목을 입력해주세요</p>}
            <button className='post-editor-submit-btn' onClick={handleSubmitBtnClick}>submit</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RPostEditor;
