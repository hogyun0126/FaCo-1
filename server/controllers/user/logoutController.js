module.exports = (req, res) => {
    // 쿠키에 포힘된 jwt 삭제
    res.clearCookie('jwt');
    res.send({message: 'ok'});
};