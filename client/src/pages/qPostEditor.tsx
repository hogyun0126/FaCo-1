import React, { useEffect, useMemo, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useRef } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { postType, qBoardLts, rBoardLts } from '../modules/posts';
import { useLocation, useNavigate } from 'react-router-dom';
import { RootState } from '../modules';
import { increaseKey } from '../modules/test';

type Location = {
  post: postType;
}

function QPostEditor () {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const location = useLocation();

  const key = useSelector((state: RootState) => state.testReducer.key); //test
  const state = useSelector((state: RootState) => state.postsReducer.qLts);

  const QuillRef = useRef<ReactQuill>();
  const [inputTitle, setInputTitle] = useState("");
  const [isTitleEmpty, setIsTitleEmpty] = useState(false);
  const locationState = location.state as Location;

  let quill = QuillRef.current?.getEditor();

  useEffect(
    () => {
      quill = QuillRef.current?.getEditor();
      if (!!locationState.post) {
        quill?.setContents(locationState.post.body);
        setInputTitle(locationState.post.title);
      }
    },
    []
  );
  
  const imageHandler = () => {
    const input = document.createElement("input");
    const formData = new FormData();
    let url = "https://mblogthumb-phinf.pstatic.net/20160506_24/yujoki76_14625160575783K2DW_JPEG/street_style_rainy_days_%2822%29.png?type=w2";

    const range = quill?.getSelection()?.index;
    if (range !== null && range !== undefined) {
      quill?.setSelection(range, 1);

      quill?.clipboard.dangerouslyPasteHTML(
        range,
        `<img src=${url} alt="이미지 태그가 삽입됩니다." />`
      );
    }

    /*
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async () => {
      const file: any = input.files;
      if (file !== null) {
        formData.append("image", file[0]);


        console.log(formData.get('image'))

        axios.post('http://localhost:4000/img', formData, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(res => {
          console.log(res)

          const range = QuillRef.current?.getEditor().getSelection()?.index;
          if (range !== null && range !== undefined) {
            let quill = QuillRef.current?.getEditor();
            quill?.setSelection(range, 1);

            quill?.clipboard.dangerouslyPasteHTML(
              range,
              `<img src=${res.data.path} alt="이미지 태그가 삽입됩니다." />`
            );
          }
        })
      }
      */
    
  };

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
          ],
          ["image"],
        ],
        handlers: {
          image: imageHandler,
        },
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
      
    if (!locationState.post) {
      console.log('신규')
      updateState.unshift({
        id: key,
        type: 'q',
        title: inputTitle,
        weather: '비',
        location: '부산',
        writer: 'lee',
        like: 5,
        createdAt: 20230101,
        body: delta,
        img: null
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
    
    dispatch(qBoardLts(updateState));
    nav('/qBoard');
  }

  function inputTitleChange(e: React.ChangeEvent<HTMLInputElement> ) {
    setInputTitle(e.target.value);
    setIsTitleEmpty(false);
  }

  return (
    <div>
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
      <div className='post-editor-submit-container'>
        {isTitleEmpty && <p>제목을 입력해주세요</p>}
        <button className='post-editor-submit-btn' onClick={handleSubmitBtnClick}>submit</button>
      </div>
    </div>
  )
}

export default QPostEditor;
