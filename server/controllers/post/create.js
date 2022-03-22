const postDB = require("../../data/post");

async function post(req, res) {
  try {
    const { QR, title, body, location, url, email } = req.body;
    const userId = req.userId;

    const createPostData = await postDB.createPost(
      QR,
      userId,
      title,
      body,
      location,
      url,
    );
    const postId = createPostData.id;
    const result = { postId, QR, userId, title, body, location, url };

    return res.status(201).json({ data: result, message: "게시글이 작성되었습니다." })
  } catch (err) {
    console.log("err", err);
    return res.status(500).json({ message: "서버 에러입니다." });
  }
}

module.exports = {
  post,
}