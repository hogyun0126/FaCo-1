const replyDB = require("../../data/reply")

async function modify(req, res) {
  try {
    const postId = req.postId;
    const { body, updatedAt, createdAt } = req.body;

    if (body) {
      replyDB.modifyReply(body, postId);
    }

    if (createdAt) {
      replyDB.modifyReply(createdAt, postId);
    }

    if (updatedAt) {
      replyDB.modifyReply(updatedAt, postId);
    }

    return res.status(201).json({ data: result, message: "댓글이 수정 되었습니다." })
  } catch (err) {
    return res.status(400).json({ message: "서버 에러입니다." });
  }
}

module.exports = {
  modify,
}