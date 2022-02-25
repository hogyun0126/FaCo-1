const { post, reply } = require('../../models');

module.exports = async (req, res) => {
    const { id: postId } = req.params;
    const { id: userId } = req.body.user;
    const { title, body, location, createdAt, updatedAt } = req.body;

    //reply를 업데이트 하는 경우
    let replyId;
    if (reply) {
        try {
            const replyInfo = await relpy.findOne({where: {replyId}});
            replyId = replyInfo.id;
        } catch (err) {
            console.log(err);
            res.status(400).send({message: 'error', messageError: '댓글이 없습니다.'});
        }
    }
    // post가 존재하는지 확인
    const posts = await post.findOne({
        where: {
            id: postId,
            user_id: userId,
        }
    })
    if (!posts) {
        return res.status(400).send({message: 'error', errorMessage: '포스트가 존재하지 않습니다.'});
    }
    // post 테이블 업데이트
    await post.update({
        title,
        body,
        location,
        createdAt,
        updatedAt,
        reply_id: replyId
    }, {
        where: { id: postId },
    });
    res.status(201).send({message:'ok'});
}