import React, { useEffect, useState } from "react";
import { Img } from "../../modules/posts";

type ImgViewProps = {
  images: Img[];
}

function ImgView({ images }: ImgViewProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const maxIdx = images.length - 1;

  useEffect(() => {
    setCurrentIdx(images.length - 1);
  }, [images])

  function preViewHandler() {
    if (currentIdx === 0) {
      setCurrentIdx(maxIdx);
    } else {
      setCurrentIdx(currentIdx - 1);
    }
  }

  function nextViewHandler() {
    if (currentIdx === maxIdx) {
      setCurrentIdx(0);
    } else {
      setCurrentIdx(currentIdx + 1);
    }
  }

  function goToClickedImgHandler(idx: number) {
    setCurrentIdx(idx);
  }

  return (
    <div>
      <div className="img-view-main-container">
        <div onClick={preViewHandler}>{'<'}</div>
        <img src={images[currentIdx].url}/>
        <div onClick={nextViewHandler}>{'>'}</div>
      </div>

      <div className="img-view-preview-container">
        {images.map((el, idx) => {
          return <img className="img-view-preview-img" key={idx} src={el.url} onClick={() => goToClickedImgHandler(idx)} />
        })}
      </div>
    </div>
  )
}

export default ImgView;
