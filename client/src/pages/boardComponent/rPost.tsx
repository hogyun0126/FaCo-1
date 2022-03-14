import { PostType } from '../../modules/posts';
import { AiFillHeart } from "react-icons/ai";
import Weather from '../Component/location'

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
      <div><div>{post.location}</div><div>{post.weather}</div></div>
      <div className='rboard-post-like'>
        <div className='heart'><AiFillHeart/></div>
        <div>{post.like}</div>
      </div>
    </div>
   </div>
  )
}

export default RPost;
