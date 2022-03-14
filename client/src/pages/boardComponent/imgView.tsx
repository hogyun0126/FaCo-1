import React, { useEffect, useState } from "react";
import { Img } from "../../modules/posts";

type ImgViewProps = {
  images: Img[];
}

function ImgView({ images }: ImgViewProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const maxIdx = images.length - 1;

  useEffect(() => {
    setCurrentIdx(0);
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
    <div className="img-view-container">
      <div className="img-view-main-container">
        <div className="img-view-main-arrow" onClick={preViewHandler}>{'<'}</div>
        <div className="img-view-main-img-box">
          <img src={images[currentIdx]?.url}/>
        </div>
        <div className="img-view-main-arrow" onClick={nextViewHandler}>{'>'}</div>
      </div>

      <div className="img-view-preview-container">
        {images.map((el, idx) => {
          return (
            <div key={idx} className="img-view-preview-img-box">
              <img src={el.url} onClick={() => goToClickedImgHandler(idx)} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ImgView;
