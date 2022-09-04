const router = require('express').Router()

const departmentController = require('../controller/department.controller')

router.post("/add", departmentController.departmentAdd)
router.get("/getAll", departmentController.departmentGetAll)
router.get("/getId/:id", departmentController.departmentGetId)
router.patch("/update", departmentController.departmentUpdate)
router.delete("/delete/:id", departmentController.departmentDelete)

module.exports = { departmentRouter: router }
