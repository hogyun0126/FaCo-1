const { post, reply } = require('../../models');
const post = require('../../models/post');

module.exports = async (req, res) => {
    const { title, body, location, createdAt, updatedAt } = req.body;

    let replys;
    try {
        const replyInfo = await reply.findOne({where: {replys}});
        replyId = replyInfo.userId;
    } catch (err) {
        console.log(err);
        res.status(400).send({message: 'error', messageError: '댓글이 없습니다.'});
    }
    try {
        // post 테이플에 포스트 저장
        const posts = await post.create({
            title,
            body,
            location,
            createdAt,
            updatedAt,
            user_id: req.body.user.userId,
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).send({message: 'error', errorMessage: '서버에 문제가 있습니다.'});
    }
    res.status(201).send({message:'ok'});
}