

const express = require('express')
const router = express.Router()
const andamentoControllers = require('./andamento.controllers')
// const auth = require('../middlewares/auth')

router.get('/andamentos' , andamentoControllers.returnAllAndamentos)


module.exports = router
