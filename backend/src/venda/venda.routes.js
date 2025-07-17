


const express = require('express')
const router = express.Router()
const venda = require('./venda.controllers')
// const auth = require('../middlewares/auth')

const resolveLoteId = require('../middlewares/resolveLoteId');

router.get('/venda', venda.getAllVendas)

// Buscar venda por ID
router.get('/vendas/:id', venda.getVendaById);

router.post('/vendas', resolveLoteId, venda.createVenda);

router.put('/vendas/:id', resolveLoteId, venda.updateVenda);

router.delete('/delete/venda/:id', venda.deleteVenda);

// router.get('/venda/filter', venda.filterBySomeCriteria);

router.get('/venda/filter/pagination', venda.paginationVenda);

module.exports = router
