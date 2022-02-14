const express = require("express");
const router = express.Router();
const userRouter = require("./user/index");

router.post("/user/signup", userRouter.signUp);
router.post("/user/signin", userRouter.signIn);
router.post("/user/signout", userRouter.signOut);

module.exports = router;