import { PostType } from "../../modules/posts";
import { HiOutlinePhotograph } from "react-icons/hi";
import { Link, NavLink } from "react-router-dom";

type QPOstProps = {
  post: PostType;
  postClickHandler: (post: PostType)=>void;
}

function QPost({ post, postClickHandler }: QPOstProps) {
  return (
    <tr>
      <td>[{post.location}/{post.weather}]</td>
      <td onClick={() => postClickHandler(post)}>{post.title} {post.img.length !== 0 && <HiOutlinePhotograph />}</td>
      <td>{post.writer}</td>
      <td>{post.createdAt}</td>
      <td>{post.like}</td>
    </tr>
  )
}

export default QPost;
