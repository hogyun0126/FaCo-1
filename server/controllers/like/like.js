async function likePost(req, res) {
  try {
    const { id: userId } = req.body.user;
    const { id: postId } = req.params;

    if (await this.like.likeInfo(userId, postId)) {
      return res.status(409).json({ message: "이미 좋아요를 누른 게시물입니다" })
    }

    const createLikeData = await this.like.createLike(
      userId,
      postId,
    );
    const likeId = createLikeData.id;
    const result = { likeId, userId, postId };

    return res.status(201).json({ data: result, message: "좋아요를 눌렀습니다." });
  } catch (err) {
    console.log(err);
    return res.status(500).send({message: "서버 에러입니다." });
}
};

module.exports = {
  likePost,
};
