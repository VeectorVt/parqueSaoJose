


const express = require('express')
const router = express.Router()
const sequencial = require('./sequencial.controllers')
const auth = require('../middlewares/auth')

// Listar todos os sequenciais

router.get('/sequencial', auth, sequencial.getAllSequenciais);

// Buscar sequencial por ID
router.get('/sequencial/:id', auth, sequencial.getSequencialById);

// Buscar sequenciais por venda
router.get('/sequencial/venda/:vendaId', auth, sequencial.getSequenciaisByVenda);

// Criar sequencial
router.post('/sequencial', auth, sequencial.createSequencial);

// Atualizar sequencial
router.put('/sequencial/:id', auth, sequencial.updateSequencial);

// Deletar sequencial
router.delete('/sequencial/:id', auth, sequencial.deleteSequencial);

module.exports = router
