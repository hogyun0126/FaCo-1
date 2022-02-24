import { PostType } from '../../modules/posts';

type RPostProps = {
  post: PostType;
  postClickHandler: (post: PostType) => void;
}

function RPost({ post, postClickHandler }: RPostProps) {
  return (
   <div className='rboard-post'>
    {post.img !== null && <img src={post.img[0].url} onClick={()=>postClickHandler(post)}/>}

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
