const { user } = require('../models');
const hashGenerator = require('../utils/hashGenerator');
const jwtGenerator = require('../utils/jwtGenerator');

module.exports = async (req, res) => {
    const { id, password } = req.body;

  // id 있는지 확인
    const userInfo = await user.findOne({ where: { id: id }});
    if (!userInfo) {
        return res.status(401).send({message: 'error', errorMessage: 'Unauthorized request - email not found'});
    }

    // password가 일치하는지 확인
    if (userInfo.password !== hashGenerator(password, userInfo.salt)) {
        return res.status(401).send({message: 'error', errorMessage: 'Unauthorized request - password not correct'});
    }
    
    // jwt token 생성 및 쿠기 생성
    const token = jwtGenerator({
        id: userInfo.id,
        email: userInfo.email,
        phone: userInfo.phone,
        location: userInfo.location,
        picture: userInfo.picture,
        sex: userInfo.sex
    });
    
    res.cookie('jwt', token);
    res.status(201).send({message: 'ok'});
};