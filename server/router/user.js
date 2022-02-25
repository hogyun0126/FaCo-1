const express = require("express");
const router = express.Router();
const { body, header, query } = require("express-validator");
const { validateError } = require("../middleware/validator");
const { accessToken } = require("../middleware/accessToken");
const { userController } = require("../controllers");

router.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("이메일을 입력해주세요"),
    body("name")
      .trim()
      .isLength({ min: 2 })
      .withMessage("이름을 입력해주세요"),
    body("password")
      .notEmpty()
      .withMessage("비밀번호를 입력해주세요"),
    body("phone")
      .isMobilePhone()
      .withMessage("번호를 입력해주세요"),
    body("location")
      .isAlpha()
      .withMessage("장소를 입력해주세요"),
    validateError,
  ],
  userController.signup,
);

router.post(
  "/signin",
  [
    body("email").isEmail().withMessage("이메일을 입력해주세요"),
    body("password")
      .notEmpty()
      .withMessage("비밀번호를 입력해주세요"),
    validateError,
  ],
  userController.signin,
);

router.post(
  "/signout",
  [
    header("Authorization")
      .trim()
      .notEmpty()
      .withMessage("이미 로그아웃 되었습니다."),
  ],
  userController.signout,
);

router.delete("/", accessToken, userController.withdraw,);

router.patch("/", accessToken, userController.modify,);

router.get(
  "/email",
  [
    query("email").isEmail().withMessage("이메일을 입력해주세요"),
    validateError,
  ],
  userController.checkEmail,
);

module.exports = router;