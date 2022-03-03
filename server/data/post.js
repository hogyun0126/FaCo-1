const { post } = require('../models');

async function postInfo(userId) {
  return post.findOne({
    where: {
      userId: userId,
    }
  })
}

async function createPost(QR, title, body, location) {
  return post.create({
    QR,
    title,
    body,
    location,
  })
}

async function deletePost(postId) {
  return post.destroy({ where: { id: postId }})
}

async function modifyPost(title, body, location) {
  return post.update({
    title: title,
    body: body,
    location: location,
  })
}

module.exports = {
  postInfo,
  createPost,
  deletePost,
  modifyPost,
};