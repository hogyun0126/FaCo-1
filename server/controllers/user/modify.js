const userDB = require("../../data/user");
const signup = require("./signup");
const signin = require("./signin")
const crypto = require("crypto");

async function modify(req, res) {
  try {
    const userId = req.userId;
    const { password, phone, location } = req.body;
    
    if(password) {
      const resultCheckPassword = signin.checkUserPassword(user, password);
      if(resultCheckPassword) {
        return res.status(500).json({ message: "이전과 동일한 비빌번호입니다." });
      }

      const [salt, encryptedPassword] = signup.createCrypto(password);
      userDB.modifyUser(userId, salt, encryptedPassword);
    }

    if(location) {
      userDB.modifyUser(location, userId);
    }

    if(phone) {
      userDB.modifyUser(phone, userId);
    }

    return res.status(200).json({ message: "정보 수정이 완료되었습니다" });
  } catch (err) {
    console.log("err", err);
    return res.status(500).json({ message: "서버 에러입니다." });
  }
}

module.exports = {
  modify,
};