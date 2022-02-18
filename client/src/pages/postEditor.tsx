import React, { useMemo, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useRef } from 'react';
import axios from 'axios';

function PostEditor () {
  const QuillRef = useRef<ReactQuill>();
  const [contents, setContents] = useState<any>("");
  
  const imageHandler = () => {
    const input = document.createElement("input");
    const formData = new FormData();
    let url = "https://mblogthumb-phinf.pstatic.net/20160506_24/yujoki76_14625160575783K2DW_JPEG/street_style_rainy_days_%2822%29.png?type=w2";

    const range = QuillRef.current?.getEditor().getSelection()?.index;
    if (range !== null && range !== undefined) {
      let quill = QuillRef.current?.getEditor();
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
    
  }

  const modules = {
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
  }

  const [a,setA] = useState<any>('');

  function handleSubmitBtnClick(e: any) {

    let quill = QuillRef.current?.getEditor();
    setA(quill?.root.innerHTML)
    console.log(typeof quill?.root.innerHTML)
  }

  function Test({html}:any) {
    //console.log(html)
    return (
      <pre dangerouslySetInnerHTML={{__html: html}}/>
    )
  }

  return (
    <div>
      <ReactQuill
        ref={(element) => {
          if (element !== null) {
            QuillRef.current = element;
          }
        }}
        modules={modules}
        theme='snow'
      />
      <button onClick={(e)=>handleSubmitBtnClick(e)}>submit</button>
      <Test html={a} />
      
    </div>
  )
}

export default PostEditor;
