


const express = require('express')
const router = express.Router()
const venda = require('./venda.controllers')
// const auth = require('../middlewares/auth')

router.get('/venda', venda.returnAllVendas)


module.exports = router
