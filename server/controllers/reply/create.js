const replyDB = require("../../data/reply")

async function reply(req, res) {
  try {
    const { body, createdAt, updatedAt } = req.body;

    const createReplyData = await replyDB.createReply(
      body,
      createdAt,
      updatedAt,
    );
    const postId = createReplyData.id;
    const userId = req.body.user.userId;
    const result = { postId, body, createdAt, updatedAt, userId };

    return res.status(201).json({ data: result, message: "댓글이 작성되었습니다." })
  } catch (err) {
    console.log("err", err);
    return res.status(500).json({ message: "서버 에러입니다." });
  }
}

module.exports = {
  reply,
}