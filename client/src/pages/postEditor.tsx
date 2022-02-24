import React, { useEffect, useMemo, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useRef } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Img, PostType, qBoardLts, rBoardLts } from '../modules/posts';
import { useLocation, useNavigate } from 'react-router-dom';
import { RootState } from '../modules';
import { increaseKey } from '../modules/test';
import ImgForm from './boardComponent/imgForm';
import ImgView from './boardComponent/imgView';

type Location = {
  post: PostType;
  boardType: 'r' | 'q';
}

function PostEditor () {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const location = useLocation();
  const locationState = location.state as Location;
  const boardType = locationState.boardType;
  const key = useSelector((state: RootState) => state.testReducer.key); //dummy
  const state = useSelector((state: RootState) => state.postsReducer[`${boardType}Lts`]); // 추후 렌더링 될때마다 서버에서 받아오는걸로 변경
 
  const QuillRef = useRef<ReactQuill>();
  const [inputTitle, setInputTitle] = useState("");
  const [isImgEmpty, setIsImgEmpty] = useState(false);
  const [isTitleEmpty, setIsTitleEmpty] = useState(false);
  const [images, setImages] = useState<Img[]>([]);

  let quill = QuillRef.current?.getEditor();

  useEffect(
    () => {
      quill = QuillRef.current?.getEditor();
      if (locationState.post !== undefined) {
        // console.log(locationState)
        quill?.setContents(locationState.post.body);
        setInputTitle(locationState.post.title);
        setImages(locationState.post.img)
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

    if (images.length === 0 && boardType === 'r') {
      return setIsImgEmpty(true);
    }

    const delta: any = quill?.getContents().ops;
    const updateState = state.slice();
      
    if (locationState.post === undefined) {
      console.log('신규')
      updateState.unshift({
        id: key,
        type: boardType,
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
        title: inputTitle,
        body: delta,
        img: images
      }
    }
    
    if (boardType === 'r') {
      dispatch(rBoardLts(updateState));
    } else {
      dispatch(qBoardLts(updateState));
    }
    
    nav(`/${boardType}Board`);
  }

  function inputTitleChange(e: React.ChangeEvent<HTMLInputElement> ) {
    setInputTitle(e.target.value);
    setIsTitleEmpty(false);
  }

  function handleImages(images: Img[]) {
    setImages(images)
  }

  return (
    <div className='r-post-editor-container'>
      <div className='r-post-editor-img-form'>
        <ImgForm images={images} handleImages={handleImages} />
        {images.length > 0 && <ImgView images={images}/>}
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
            {isImgEmpty && <p>이미지를 추가해주세요</p>}
            <button className='post-editor-submit-btn' onClick={handleSubmitBtnClick}>submit</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostEditor;
