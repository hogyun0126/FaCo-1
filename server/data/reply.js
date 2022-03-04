const { reply } = require('../models');

async function replyInfo(userId) {
  return reply.findOne({
    where: {
      userId: userId,
    }
  })
}

async function createReply(body) {
  return reply.create({
    body,
  })
}

async function deleteReply(postId) {
  return reply.destroy({ where: { id: postId }})
}

async function modifyReply(body) {
  return reply.update({
    body: body,
  })
}

module.exports = {
  replyInfo,
  createReply,
  deleteReply,
  modifyReply,
};