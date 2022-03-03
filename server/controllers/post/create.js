const postDB = require("../../data/post")

async function post(req, res) {
  try {
    const { QR, title, body, location } = req.body;

    const createPostData = await postDB.createPost(
      QR,
      title,
      body,
      location,
    );
    const postId = createPostData.id;
    const userId = req.body.user.userId;
    const result = { postId, QR, title, body, location, userId };

    return res.status(201).json({ data: result, message: "게시글이 작성되었습니다." })
  } catch (err) {
    console.log("err", err);
    return res.status(500).json({ message: "서버 에러입니다." });
  }
}

module.exports = {
  post,
}