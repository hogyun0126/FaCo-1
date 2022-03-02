const router = require("express").Router();
const { postController } = require("../controllers");

router.post("/post", postController.create.post)

router.delete("/", postController.delete.unpost)

router.patch("/", postController.modify.modify)

module.exports = router;