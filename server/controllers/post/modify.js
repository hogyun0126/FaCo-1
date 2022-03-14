const postDB = require("../../data/post")

async function modify(req, res) {
  try {
    const postId = req.postId;
    const { title, body, location, url } = req.body;

    if (title) {
      postDB.modifyPost(title, postId);
    }

    if (body) {
      postDB.modifyPost(body, postId);
    }

    if (location) {
      postDB.modifyPost(location, postId);
    }

    if (url) {
      postDB.modifyPost(url, postId);
    }

    return res.status(201).json({ message: "게시글이 수정 되었습니다." })
  } catch (err) {
    return res.status(400).json({ message: "서버 에러입니다." });
  }
}

module.exports = {
  modify,
}