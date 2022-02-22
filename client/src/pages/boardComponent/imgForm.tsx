import React, { useState } from "react";

type Img = {
  file: File;
  url: string;
  checked: boolean;
}

type ImgFormProps = {
  images: string[];
  handleImages: (images: string[]) => void;
}

function ImgForm({ images, handleImages }: ImgFormProps) {
  const [imgFiles, setImageFile] = useState<Img[]>([]);

  function imgHandler() {
    const input = document.createElement('input');
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    // type
    input.onchange = async (e: any) => {
      const files = e.target.files;
      const formData = new FormData();

      // files[0] 파일 올리면 s3에 보내서 주소 받아옴
      const url = 'https://mblogthumb-phinf.pstatic.net/20160506_24/yujoki76_14625160575783K2DW_JPEG/street_style_rainy_days_%2822%29.png?type=w2';
      setImageFile([...imgFiles, {
        file: files[0],
        url: url,
        checked: false,
      }])


      // 미리보기 구현해야 함
    }
  }

  function checkBoxHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const update = imgFiles.map(el => {
      if (el.file.name === e.target.value) {
        el.checked = e.target.checked;
      }
      return el;
    });

    setImageFile(update);
    const checked = update.filter(el => el.checked).map(el => el.url);
    handleImages(checked);
  }

  return (
    <div>
      <div onClick={imgHandler}>+</div>
      <div>
        {imgFiles.map((el, idx) => (
          <label key={idx}>
            <input  type='checkbox' value={el.file.name} onChange={(e)=>checkBoxHandler(e)} />
            {el.file.name}
          </label>
          ))}
      </div>
    </div>
  )
}

export default ImgForm;
