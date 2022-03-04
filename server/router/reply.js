const router = require("express").Router();
const { replyController } = require("../controllers");

router.reply("/reply", replyController.create.reply);
  
router.reply("/", replyController.delete.unreply);

router.reply("/", replyController.modify.modify);
  
module.exports = router;