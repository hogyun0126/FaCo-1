const express = require("express");
const router = express.Router();
const userRouter = require("./user/index");

router.post("/user/signupController", userRouter.signUp);
router.post("/user/loginController", userRouter.signIn);
router.post("/user/logoutController", userRouter.signOut);

module.exports = router;