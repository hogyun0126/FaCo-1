const crypto = require("crypto");
const userDB = require("../../data/user");
const checkEmail = require("./checkEmail");

function createCrypto(password) {
  const salt = crypto.randomBytes(64).toString("hex");
  const encryptedPassword = crypto
    .pbkdf2Sync(password, salt, 9999, 64, "sha512")
    .toString("base64");

  return [salt, encryptedPassword];
}

async function signup(req, res) {
  try {
    const { email, name, password, phone, location, sex } = req.body;

    if (await checkEmail.resultUserByEmail(email)) {
      return res.status(409).json({ message: `이미 존재하는 이메일입니다.` });
    }

    const [salt, encryptedPassword] = createCrypto(password);
    const createUserData = await userDB.createUser(
      email,
      name,
      encryptedPassword,
      phone,
      location,
      sex,
      salt,
    );
    const userId = createUserData.id;
    const result = { userId, email, name, phone, location, sex };

    return res
      .status(201).json({ data: result, message: "회원가입이 완료되었습니다" });
  } catch (err) {
    console.log("err", err);
    return res.status(500).json({ message: "서버 에러입니다." });
  }
}

module.exports = {
  createCrypto,
  signup,
};