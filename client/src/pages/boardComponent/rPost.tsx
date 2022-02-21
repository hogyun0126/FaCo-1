import { postType } from '../../modules/posts';

type RPostProps = {
  post: postType;
  postClickHandler: (post: postType) => void;
}

function RPost({ post, postClickHandler }: RPostProps) {
  // 링크 걸어야함 자세히보기 페이지로, 좋아요 기능 미완
  return (
  
   <div className='rboard-post'>
    {post.img !== null && <img src={post.img[0]} onClick={()=>postClickHandler(post)}/>}

    <div className='rboard-title'>
      <div onClick={()=>postClickHandler(post)}>[{post.location}/{post.weather}] {post.title}</div>
      <div className='rboard-like'>하트{post.like}</div>
    </div>

    <div className='rboard-info'>
      <p>{post.writer}</p>
      <p>{post.createdAt}</p>
    </div>
   </div>
  )
}

export default RPost;
