const userDB = require("../../data/user");
const signup = require("./signup");
const signin = require("./signin")
const crypto = require("crypto");

async function modify(req, res) {
  try {
    const userId = req.userId;
    const { password, phone, location } = req.body;
    const user = await userDB.resultUserById(userId);
    const resultCheckPassword = signin.checkUserPassword(user, password);
    const [salt, encryptedPassword] = signup.createCrypto(password);

    if(resultCheckPassword) {
      return res.status(501).json({ message: "이전과 동일한 비밀번호입니다." });
    }

    userDB.modifyUser(userId, encryptedPassword, phone, location, salt);

    return res.status(200).json({
      data: { phone: phone, location: location },
      message: "정보 수정이 완료되었습니다"
    });
  } catch (err) {
    console.log("err", err);
    return res.status(500).json({ message: "서버 에러입니다." });
  }
}

module.exports = {
  modify,
};