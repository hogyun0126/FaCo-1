const { post } = require('../../models');

module.exports = async (req, res) => {
    const { id: postId } = req.params;
    const { id: userId } = req.body.user;
// post_id, user_id가 일치하는 포스트 검색
    const posts = await post.findOne({
        where: {
            id: postId,
            user_id: userId,
        }
    });
// 일치하는 포스트가 없다면 에러 리턴
    if (!posts) {
        return res.status(400).send({message: 'error', errorMessage: '포스팅을 찾을 수 없습니다.'});
    }
// 포스트 삭제
    try {
        await post.destroy({
            where: {
                id: postId,
                user_id: userId,
            }
        });
    } catch (err) {
        console.log(err);
        return res.status(400).send({message: 'error', errorMessage:'데이터베이스 에러 발생'});
    }
    res.send({message:'ok'});
};