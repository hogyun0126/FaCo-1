const replyDB = require("../../data/reply")

async function unreply(req, res) {
  try {
    const postId = req.postId;

    replyDB.deleteReply(postId);

    return res.status(201).json({ data: result, message: "댓글이 삭제되었습니다." })
  } catch (err) {
    console.log("err", err);
    return res.status(500).json({ message: "서버 에러입니다." });
  }
}

module.exports = {
  unreply,
}