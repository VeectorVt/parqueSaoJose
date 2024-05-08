


const express = require('express')
const router = express.Router()
const lancamento = require('./lancamento.controllers')
// const auth = require('../middlewares/auth')

router.get('/lancamentos', lancamento.returnAllLancamentos)


module.exports = router
