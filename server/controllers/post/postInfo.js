const postDB = require("../../data/post")

async function allPost(req, res) {
  const postId = req.postId;
  const postInfo = await postDB.allPostInfo(postId);

  if(!postInfo) {
    return res.status(400).json({ message: "등록된 글이 없습니다." })
  }

  return res.status(200).json(postInfo);
}

module.exports = {
  allPost,
};