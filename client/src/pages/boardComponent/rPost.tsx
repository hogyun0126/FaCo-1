import { RBoardPost } from '../../modules/posts';

type RPostProps = {
  post: RBoardPost;
}

function RPost({ post }: RPostProps) {
  // 링크 걸어야함 자세히보기 페이지로, 좋아요 기능 미완
  return (
   <div >
    <img src={post.img}/>
    <p>[{post.location}/{post.weather}] {post.title}</p>
    <p>{post.writer}</p>
    <p>{post.createdAt}</p>
    <div>하트 넣을곳{post.like}</div>
   </div>
  )
}

export default RPost;
