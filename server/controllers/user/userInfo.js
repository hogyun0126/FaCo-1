const userDB = require("../../data/user")

async function userInfo(req, res) {
  try{
    const userId = req.userId;
    const findUser = await userDB.resultUserById(userId);

    if(!findUser) {
      return res.status(404).json({ message: "해당 사용자를 찾을 수 없습니다." })
    }

    const findUserInfo = await userDB.findUserInfo(userId);
    const { id, email, name, phone, location, sex } = findUserInfo[0].dataValues;

    const result = { id, email, name, phone, location, sex };

    return res.status(200).json({ data: result, message: "해당 사용자의 정보를 불러옵니다." })
  } catch (err) {
    console.log("err", err);
    return res.status(500).json({ message: "서버 에러입니다." });
  }
};

module.exports = {
    userInfo,
  };