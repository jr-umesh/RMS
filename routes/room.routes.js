const router = require('express').Router()

const roomController = require('../controller/room.controller')

router.post("/add", roomController.roomAdd)
router.get("/getAll", roomController.roomGetAll)
router.get("/getId/:id", roomController.roomGetId)
router.patch("/update", roomController.roomUpdate)
router.delete("/delete/:id", roomController.roomDelete)

module.exports = { roomRouter: router }
