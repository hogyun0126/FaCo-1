import { PostType } from '../../modules/posts';

type RPostProps = {
  post: PostType;
  postClickHandler: (post: PostType) => void;
}

function RPost({ post, postClickHandler }: RPostProps) {
  return (
   <div className='rboard-post-container' onClick={()=>postClickHandler(post)}>
    <div className='rboard-post-img-box'>
      {post.img !== null && <img src={post.img[0].url}/>}
    </div>
    <div className='rboard-post-info'>
      <div>{post.location} / {post.weather}</div>
      <div className='rboard-post-like'>하트{post.like}</div>
    </div>
   </div>
  )
}

export default RPost;
