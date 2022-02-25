const express = require("express");
const router = express.Router();
const { body, header, query } = require("express-validator");
const { validateError } = require("../middleware/validator");
const { likeController } = require("../controllers");

router.post(
  "/",
  [
    query("userId")
      .trim(),
    query("postId")
      .notEmpty(),
    validateError,
  ],
  likeController.like.likePost,
);

module.exports = router;