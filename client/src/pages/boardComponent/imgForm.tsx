import React, { useEffect, useState } from "react";
import { Img } from "../../modules/posts";

type ImgForm = Img & {
  checked: boolean;
}

type ImgFormProps = {
  images: Img[];
  handleImages: (images: Img[]) => void;
}

function ImgForm({ images, handleImages }: ImgFormProps) {
  const [imgFiles, setImageFile] = useState<ImgForm[]>([]);

  useEffect(() => {
    const memo = images.map(el => {
      return {
        ...el,
        checked: true,
      }
    })
    setImageFile(memo);
  }, [images]);

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
      const update = [
        ...imgFiles,
        {
          name: files[0].name,
          url: url,
          checked: true,
        }
      ];

      updateImg(update);
    }
  }

  function checkBoxHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const update = imgFiles.map(el => {
      if (el.name === e.target.value) {
        el.checked = e.target.checked;
      }
      return el;
    });

    updateImg(update);
  }

  function updateImg(update: ImgForm[]) {
    setImageFile(update);
    const checked = update
      .filter(el => el.checked)
      .map(el => {
        return {
          name: el.name,
          url: el.url
        }
      });

    handleImages(checked);
  }

  return (
    <div>
      <div onClick={imgHandler}>+</div>
      <div>
        {imgFiles.map((el, idx) => (
          <label key={idx}>
            <input  type='checkbox' value={el.name} onChange={(e)=>checkBoxHandler(e)} checked />
            {el.name}
          </label>
          ))}
      </div>
    </div>
  )
}

export default ImgForm;
