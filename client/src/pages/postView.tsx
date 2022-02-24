import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { RootState } from "../modules";
import { decreaseLike, increaseLike, PostType } from "../modules/posts";

import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';
import ImgView from "./boardComponent/imgView";

type PostViewProps = {
  post: PostType;
}

function PostView({ post }: PostViewProps) {
  const dispatch = useDispatch();
  const userInfo = {}// 로그인한 유저 데이터 가져옴 (아마 로그인 할때 리덕스에 저장)
  // 서버요청
  // 1. post.id의 writer와 userInfo가 같은지
  const [isWriter, setIsWriter] = useState(true);
  // 2. like테이블에서 해당 post를 userInfo가 눌럿는지
  const [isAlreadyLike, setIsAlreadyLike] = useState(false);


  const converter = new QuillDeltaToHtmlConverter(post.body, {});
  const html = converter.convert();
  //console.log(post.body)

  function handleLikeClick() {
    // 안눌럿으면 증가
    dispatch(increaseLike(post.id, post.type));
    // 눌럿으면 감소
    // dispatch(decreaseLike(post.id, post.type));
  }

  return (
    <div className="postview-container">
      {post.img.length !== 0 && 
      <div>
        <ImgView images={post.img} />
      </div>}

      <div className="postview-content-container">
        <div>{post.title}</div>
        <pre dangerouslySetInnerHTML={{__html: html}}/>

        <div>
          <div onClick={handleLikeClick}>좋아요 {post.like}</div>
          {
            isWriter && 
              <NavLink to='/postEditor' state={{post, boardType: post.type}}>
                <button>수정하기</button>
              </NavLink>
          }
        </div>

        <div>
          <p>댓글</p>
          <div>댓글들</div>
          <div>댓글들</div>
        </div>
      </div>
    </div>
  )
}

export default PostView;
