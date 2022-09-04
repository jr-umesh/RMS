const router = require('express').Router()

const teacherController = require('../controller/teacher.controller')

router.post("/add", teacherController.teacherAdd)
router.get("/getAll", teacherController.teacherGetAll)
router.get("/getId/:id", teacherController.teacherGetId)
router.patch("/update", teacherController.teacherUpdate)
router.delete("/delete/:id", teacherController.teacherDelete)

module.exports = { teacherRouter: router }