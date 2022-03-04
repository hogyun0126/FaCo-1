const replyDB = require("../../data/reply")

async function reply(req, res) {
  try {
    const { body } = req.body;

    const createReplyData = await replyDB.createReply(
      body,
    );
    const replyId = createReplyData.id;
    const postId = req.body.post.postId;
    const userId = req.body.user.userId;
    const result = { replyId, postId, body, userId };

    return res.status(201).json({ data: result, message: "댓글이 작성되었습니다." })
  } catch (err) {
    console.log("err", err);
    return res.status(500).json({ message: "서버 에러입니다." });
  }
}

module.exports = {
  reply,
}