const replyDB = require("../../data/reply")

async function modify(req, res) {
  try {
    const replyId = req.replyId;
    const { body } = req.body;

    if (body) {
      replyDB.modifyReply(body, replyId);
    }

    return res.status(201).json({ message: "댓글이 수정 되었습니다." })
  } catch (err) {
    return res.status(400).json({ message: "서버 에러입니다." });
  }
}

module.exports = {
  modify,
}