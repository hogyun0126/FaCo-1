const { post } = require('../models');

async function postInfo(userId) {
  return post.findOne({
    where: {
      userId: userId,
    }
  })
}

async function allPostInfo(postId) {
  return post.findAll({
    where: {
      postId: postId
    }
  });
}

async function createPost(QR, title, body, location, url) {
  return post.create({
    QR,
    title,
    body,
    location,
    url,
  })
}

async function deletePost(postId) {
  return post.destroy({ where: { id: postId }})
}

async function modifyPost(title, body, location, url) {
  return post.update({
    title: title,
    body: body,
    location: location,
    url: url,
  })
}

module.exports = {
  postInfo,
  allPostInfo,
  createPost,
  deletePost,
  modifyPost,
};