


const express = require('express')
const router = express.Router()
const contaMovimentoControllers = require('./conta-movimento.controllers')
// const auth = require('../middlewares/auth')

router.get('/conta-movimento', contaMovimentoControllers.returnAllContasMovimento)


module.exports = router
