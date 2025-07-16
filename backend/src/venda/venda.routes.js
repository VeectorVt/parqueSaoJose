


const express = require('express')
const router = express.Router()
const venda = require('./venda.controllers')
// const auth = require('../middlewares/auth')

const resolveLoteId = require('../middlewares/resolveLoteId');

router.get('/venda', venda.getAllVendas)

router.post('/vendas', resolveLoteId, createVenda);
router.put('/vendas/:id', resolveLoteId, updateVenda);


router.delete('/delete/venda/:id', venda.deleteVenda);

// router.get('/venda/filter', venda.filterBySomeCriteria);

router.get('/venda/filter/pagination', venda.paginationVenda);

module.exports = router
