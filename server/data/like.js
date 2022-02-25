const { like } = require('../models');

async function likeInfo(userId, postId) {
  return like.findOne({
    where: {
      userId: userId,
      postId: postId,
    }
  })
}

async function createLike(userId, postId) {
  return like.create({
    userId: userId,
    postId: postId,
  })
}

async function deleteLike(likeId) {
  return like.destroy({ where: { id: likeId}})
}

module.exports = {
    likeInfo,
    createLike,
    deleteLike,
  };