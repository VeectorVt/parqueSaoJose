
const express = require('express')
const router = express.Router()
const baixaControllers = require('./baixa.controllers')
// const auth = require('../middlewares/auth')

// Listar todas as baixas
router.get('/baixas', baixaControllers.getAllBaixas);

// Buscar baixa por ID
router.get('/baixa/:id', baixaControllers.getBaixaById);

// Buscar baixas por venda
router.get('/baixas/venda/:vendaId', baixaControllers.getBaixasByVenda);

// Criar baixa
router.post('/baixa', baixaControllers.createBaixa);

// Atualizar baixa
router.put('/baixa/:id', baixaControllers.updateBaixa);

// Deletar baixa
router.delete('/baixa/:id', baixaControllers.deleteBaixa);


module.exports = router
