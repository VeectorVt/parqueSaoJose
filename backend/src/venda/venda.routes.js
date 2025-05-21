


const express = require('express')
const router = express.Router()
const venda = require('./venda.controllers')
// const auth = require('../middlewares/auth')

router.get('/venda', venda.getAllVendas)

router.post('/register/venda', venda.createVenda);

router.put('/edit/venda/:id', venda.updateVenda);

router.delete('/delete/venda/:id', venda.deleteVenda);

// router.get('/venda/filter', venda.filterBySomeCriteria);

router.get('/venda/filter/pagination', venda.paginationVenda);

module.exports = router
