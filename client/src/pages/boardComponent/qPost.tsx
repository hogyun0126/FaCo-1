import { postType } from "../../modules/posts";
import { HiOutlinePhotograph } from "react-icons/hi";

type QPOstProps = {
  post: postType;
}

function QPost({ post }: QPOstProps) {
  return (
    <tr>
      <td>[{post.location}/{post.weather}]</td>
      <td>{post.title} {post.img !== null && <HiOutlinePhotograph />}</td>
      <td>{post.writer}</td>
      <td>{post.createdAt}</td>
      <td>{post.like}</td>
    </tr>
  )
}

export default QPost;
