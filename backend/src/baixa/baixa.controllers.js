// controllers/baixaController.js
const mongoose = require('mongoose');
const Baixa = require('../models/Baixa');
const Venda = require('../models/Venda');

const applyBaixaPopulates = (query) =>
  query
    .populate({ path: 'venda', populate: 'lote' }); // traz a venda completa com lote

exports.createBaixa = async (req, res) => {
  try {
    const baixa = await Baixa.create(req.body);
    const fullBaixa = await applyBaixaPopulates(Baixa.findById(baixa._id));
    return res.status(201).json(fullBaixa);
  } catch (err) {
    if (err.name === 'ValidationError') {
      const msgs = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ message: 'Erro de validação', errors: msgs });
    }
    return res.status(500).json({ message: err.message });
  }
};

exports.getAllBaixas = async (req, res) => {
  try {
    const baixas = await applyBaixaPopulates(Baixa.find());
    return res.json(baixas);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getBaixaById = async (req, res) => {
  try {
    const baixa = await applyBaixaPopulates(Baixa.findById(req.params.id));
    if (!baixa) return res.status(404).json({ message: 'Baixa não encontrada' });
    return res.json(baixa);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getBaixasByVenda = async (req, res) => {
  try {
    const baixas = await applyBaixaPopulates(
      Baixa.find({ venda: req.params.vendaId })
    );
    return res.json(baixas);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.updateBaixa = async (req, res) => {
  try {
    const baixa = await Baixa.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!baixa) return res.status(404).json({ message: 'Baixa não encontrada' });
    const fullBaixa = await applyBaixaPopulates(Baixa.findById(baixa._id));
    return res.json(fullBaixa);
  } catch (err) {
    if (err.name === 'ValidationError') {
      const msgs = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ message: 'Erro de validação', errors: msgs });
    }
    return res.status(500).json({ message: err.message });
  }
};

exports.deleteBaixa = async (req, res) => {
  try {
    const baixa = await Baixa.findByIdAndDelete(req.params.id);
    if (!baixa) return res.status(404).json({ message: 'Baixa não encontrada' });
    return res.json({ message: 'Baixa removida com sucesso' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
