const express = require("express");
const router = express.Router();
const { body, header, query } = require("express-validator");
const { validateError } = require("../middleware/validator");
const { replyController } = require("../controllers");

router.reply(
    "/create",
    [
      body("body")
        .isReply()
        .withMessage("댓글이 작성되었습니다"),
      body("body")
        .notEmpty()
        .withMessage("서버에 문제가 있습니다"),
      validateError,
    ],
    replyController.create.create,
  );
  
  router.reply(
    "/delete",
    [
      body("body").isReply().withMessage("댓글이 삭제되었습니다"),
      body("body")
        .notEmpty()
        .withMessage("서버에 문제가 있습니다"),
      validateError,
    ],
    userController.delete.delete,
  );

  router.reply(
    "/modify",
    [
      body("body").updateReply().withMessage("댓글이 수정되었습니다"),
      body("body")
        .notEmpty()
        .withMessage("서버에 문제가 있습니다"),
      validateError,
    ],
    userController.modify.modify,
  );
  
  module.exports = router;