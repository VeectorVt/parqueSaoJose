


const express = require('express')
const router = express.Router()
const sequencial = require('./sequencial.controllers')
const auth = require('../middlewares/auth')

router.get('/sequencial', auth ,sequencial.returnAllSequencials)


module.exports = router
