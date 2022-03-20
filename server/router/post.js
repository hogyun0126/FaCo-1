const router = require("express").Router();
const { accessToken } = require("../middleware/accessToken");
const { postController } = require("../controllers");

router.post("/post", accessToken, postController.create.post)

router.delete("/", accessToken, postController.delete.unpost)

router.patch("/", accessToken, postController.modify.modify)

router.get("/", accessToken, postController.allPost.allPost)

module.exports = router;
