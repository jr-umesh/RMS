const router = require('express').Router()

const subjectController = require('../controller/subject.controller')

router.post("/add", subjectController.subjectAdd)
router.get("/getAll", subjectController.subjectGetAll)
router.get("/getId/:id", subjectController.subjectGetId)
router.patch("/update", subjectController.subjectUpdate)
router.delete("/delete/:id", subjectController.subjectDelete)

module.exports = { subjectRouter: router }
