const router = require("express").Router();
const { accessToken } = require("../middleware/accessToken");
const { userController } = require("../controllers");

router.post("/signup", userController.signup.signup);

router.post("/signin", userController.signin.signin);

router.post("/signout", userController.signout.signout);

router.delete("/", accessToken, userController.withdraw.withdrawUser,);

router.patch("/", accessToken, userController.modify.modify,);

router.get("/userInfo", accessToken, userController.userInfo.userInfo);

module.exports = router;