/*file:user.routes.js
*Descrição:arquivo responsável pelas rotas do User
*Data:07/06/2021
*Author:Veector
*/


const express = require('express')
const router = express.Router()
const lotesController = require('./lotes.controllers')
// const auth = require('../middlewares/auth')

router.get('/lotes' , lotesController.returnAllLotes)


module.exports = router
