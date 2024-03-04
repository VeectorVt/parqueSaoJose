
const express = require('express')
const router = express.Router()
const baixaControllers = require('./baixa.controllers')
// const auth = require('../middlewares/auth')

router.get('/baixas' , baixaControllers.returnAllBaixas)


module.exports = router
