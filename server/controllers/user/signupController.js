const { Op } = require('sequelize');
const { user } = require('../models');
const user = require('../models/user');
const hashGenerator = require('../utils/hashGenerator');
const saltGenerator = require('../utils/saltGenerator');

module.exports = async (req, res) => {
    const { nickname, name, email, password, passwordCheck, phoneNumber} = req.body;
    // password, passwordCheck 같은지 확인
    if (password !== passwordCheck) {
        return res.status(400).send({message: 'error', errorMessage: 'Invalid Request'});
    }
    // nickname 또는 email이 존재하는지 확인
    const userInfo = await user.findOne({where: {
        [Op.or]: [
        {nickname: nickname}, 
        {email: email},
        ]}});

    if (userInfo) {
        return res.status(409).send({message: 'error', errorMessage: 'User already exists'});
    }
    
    // 비밀번호 해시화하기
    const salt = saltGenerator();
    const hashedPassword = hashGenerator(password, salt);
    
    // 회원가입 하기
    try {
        await user.create({
        nickname,
        name,
        email,
        password: hashedPassword,
        phone: phoneNumber,
        salt,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send({message: 'error', errorMessage: 'Server error'});
    }
    
    res.status(201).send({message:'ok'});
};