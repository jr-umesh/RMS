const router = require('express').Router()

const userController = require('../controller/user.controller')

router.post("/register", userController.userRegister)
router.post("/login", userController.userLogin)

module.exports = { userRouter: router }
