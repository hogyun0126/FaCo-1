const router = require("express").Router();
const { likeController } = require("../controllers");

router.post("/", likeController.like.likePost,);

module.exports = router;