const userDB = require("../../data/user");
const signup = require("./signup");
const crypto = require("crypto");

async function modify(req, res) {
  try {
    const userId = req.userId;
    const { password, phone, location } = req.body;

    if (password) {
      const [salt, encryptedPassword] = signup.createCrypto(password);
      userDB.modifyUser(userId, salt, encryptedPassword);
    }

    if (location) {
      userDB.modifyUser(location, userId);
    }

    if (phone) {
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