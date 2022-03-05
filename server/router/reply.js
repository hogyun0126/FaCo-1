const router = require("express").Router();
const { replyController } = require("../controllers");

router.post("/reply", replyController.create.reply);
  
router.delete("/", replyController.delete.unreply);

router.patch("/", replyController.modify.modify);
  
module.exports = router;