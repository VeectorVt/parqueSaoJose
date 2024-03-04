


const express = require('express')
const router = express.Router()
const bancoControllers = require('./banco.controllers')
// const auth = require('../middlewares/auth')

router.get('/banco' , bancoControllers.returnAllBancos)


module.exports = router
