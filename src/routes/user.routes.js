const exppress = require("express");
const { validateLoginUser } = require("../validations/user.validation");
const { userLogin } = require("../controllers/user.controllers");

const userRouter = exppress.Router();

userRouter.post("/login", validateLoginUser, userLogin);

module.exports = userRouter;
