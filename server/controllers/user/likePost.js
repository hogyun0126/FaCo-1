const { like } = require('../models');

module.exports = async (req, res) => {
  const { id: postId } = req.params;
  const { id: userId } = req.user;

  try {
  // 좋아요를 한 적이 있는지 확인
    const likeInfo = await like.findOne({
      where: {
        post_id: postId,
        user_id: userId,
      }
    });
    if (!likeInfo) {
    // 없으면 생성
      await like.create({
        post_id: postId,
        user_id: userId,
      });
    } else {
    // 있으면 삭제
      await like.destroy({
        where: {
          post_id: postId,
          user_id: userId,
        }
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({message: 'error', errorMessage: 'DB Error'});
  }
  
  res.send({message: 'ok'});

};