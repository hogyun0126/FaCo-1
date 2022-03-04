const { reply } = require('../models');

async function replyInfo(userId) {
  return reply.findOne({
    where: {
      userId: userId,
    }
  })
}

async function createReply(body, createdAt, updatedAt) {
  return reply.create({
    body,
    createdAt,
    updatedAt,
  })
}

async function deleteReply(postId) {
  return reply.destroy({ where: { id: postId }})
}

async function modifyReply(body, createdAt, updatedAt) {
  return reply.update({
    body: body,
    createdAt,
    updatedAt,
  })
}

module.exports = {
  replyInfo,
  createReply,
  deleteReply,
  modifyReply,
};