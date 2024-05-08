


const express = require('express')
const router = express.Router()
const situacao = require('./situacao.controllers')
// const auth = require('../middlewares/auth')

router.get('/situacao', situacao.returnAllSituacoes)


module.exports = router
