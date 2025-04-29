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

router.post('/register/lotes',lotesController.registerNewLote);

router.put('/edit/lotes/:id', lotesController.returnEditLote)

router.delete('/delete/lotes/:id', lotesController.deleteLote)

router.get('/lotes/filter', lotesController.filterByQuadraOrLote);


module.exports = router




