import { postType } from "../../modules/posts";
import { HiOutlinePhotograph } from "react-icons/hi";

type QPOstProps = {
  post: postType;
}

function QPost({ post }: QPOstProps) {
  return (
    <div>
      <p>[{post.location}/{post.weather}]</p>
      <p>{post.title} {post.img !== null && <HiOutlinePhotograph />}</p>
      <p>{post.writer}</p>
      <p>{post.createdAt}</p>
      <p>{post.like}</p>
    </div>
  )
}

export default QPost;
