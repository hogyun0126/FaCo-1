const router = require("express").Router();
const { postController } = require("../controllers");
const post = require("../controllers/post");

router.post("/post", postController.create.post)

router.delete("/", postController.delete.unpost)

router.patch("/", postController.modify.modify)

module.exports = router;