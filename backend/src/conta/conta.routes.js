


const express = require('express')
const router = express.Router()
const contaControllers = require('./conta.controllers')
// const auth = require('../middlewares/auth')

router.get('/conta' , contaControllers.returnAllContas)


module.exports = router
