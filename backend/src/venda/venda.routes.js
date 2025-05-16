


const express = require('express')
const router = express.Router()
const venda = require('./venda.controllers')
// const auth = require('../middlewares/auth')

router.get('/venda', venda.returnAllVendas)

router.post('/register/venda', venda.registerNewVenda);

router.put('/edit/venda/:id', venda.returnEditVenda);

router.delete('/delete/venda/:id', venda.deleteVenda);

// router.get('/venda/filter', venda.filterBySomeCriteria);

router.get('/venda/filter/pagination', venda.paginationVenda);

module.exports = router
