import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { RootState } from "../modules";
import { decreaseLike, increaseLike, PostType } from "../modules/posts";
import { AiFillHeart } from "react-icons/ai";

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
  const [comment, setComment] = useState<string[]>([]);
  const [textareaValue, setTextareaValue] = useState('');

  const converter = new QuillDeltaToHtmlConverter(post.body, {});
  const html = converter.convert();
  //console.log(post.body)

  useEffect(() => {
    async function callback() {
      // await 해당 post id의 댓글들 요청
      const arr = ['댓글1', '댓글2', '댓글3', '댓글4'];
      setComment(arr);
      // await 해당 포스트에 대해 로그인한 유저가 눌렀는지 받아옴
      const data = false;
      setIsAlreadyLike(data)
    }
    callback();
  }, []);

  function handleLikeClick() {
    if (isAlreadyLike) {
      dispatch(decreaseLike(post.id, post.type));
      setIsAlreadyLike(false);
    } else {
      dispatch(increaseLike(post.id, post.type));
      setIsAlreadyLike(true);
    }
  }

  function handleCommentSubmit() {
    // post 아이디로 comment 테이블에 요청보냄
    // state 갱신 - 일회성 추후 어차피 서버에서 받아옴
    setComment([...comment, textareaValue]);
    setTextareaValue('');
  }

  function handleTextareaChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setTextareaValue(e.target.value);
  }

  return (
    <div className="postview-container">
      {post.img.length !== 0 && 
      <div className='postview-img'>
        <ImgView images={post.img} />
      </div>}

      <div className="postview-content-container">
        <div className="postview-content-title">{post.title}</div>
        <pre className="postview-content-body" dangerouslySetInnerHTML={{__html: html}}/>

        <div className="postview-content-like-container">
          <div className='postview-content-like post-patch-btn' onClick={handleLikeClick}>
            <div>
              <AiFillHeart/>
            </div>
            <div>{post.like}</div>
            </div>
          {isWriter && 
            <div className='post-patch-btn'>
              <NavLink to='/postEditor' state={{post, boardType: post.type}}>
                <button>수정하기</button>
              </NavLink>
              <button>삭제하기</button>
            </div>
          }
        </div>
        <div>
          <p>댓글</p>
          <div className="postview-content-commentes">
            {comment.map((el, idx) => {
              return <div key={idx}>{el}</div>
            })}
          </div>
          <div className="postview-content-comment-form">
            <textarea value={textareaValue} onChange={(e) => handleTextareaChange(e)} maxLength={200} placeholder="최대 200자까지 입력할 수 있습니다"></textarea>
            <div className='comment-btn'>
              <button onClick={handleCommentSubmit}>댓글등록</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostView;
