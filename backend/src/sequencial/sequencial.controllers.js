// controllers/sequencialController.js
const mongoose = require('mongoose');
const Sequencial = require('./sequencial.model');
const Venda = require('../venda/venda.model');
const Andamento = require('../andamento/andamento.model');

const applySequencialPopulates = (query) =>
  query
    .populate({ path: 'venda', populate: 'lote' })              // exibe venda + lote
    .populate('codigo_andamento');                             // exibe o andamento

exports.createSequencial = async (req, res) => {
  try {
    const seq = await Sequencial.create(req.body);
    const fullSeq = await applySequencialPopulates(Sequencial.findById(seq._id));
    return res.status(201).json(fullSeq);
  } catch (err) {
    if (err.name === 'ValidationError') {
      const msgs = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ message: 'Erro de validação', errors: msgs });
    }
    return res.status(500).json({ message: err.message });
  }
};

exports.getAllSequenciais = async (req, res) => {
  try {
    const seqs = await applySequencialPopulates(Sequencial.find());
    return res.json(seqs);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getSequencialById = async (req, res) => {
  try {
    const seq = await applySequencialPopulates(Sequencial.findById(req.params.id));
    if (!seq) return res.status(404).json({ message: 'Sequencial não encontrado' });
    return res.json(seq);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getSequenciaisByVenda = async (req, res) => {
  try {
    const seqs = await applySequencialPopulates(
      Sequencial.find({ venda: req.params.vendaId })
    );
    return res.json(seqs);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.updateSequencial = async (req, res) => {
  try {
    const seq = await Sequencial.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!seq) return res.status(404).json({ message: 'Sequencial não encontrado' });
    const fullSeq = await applySequencialPopulates(Sequencial.findById(seq._id));
    return res.json(fullSeq);
  } catch (err) {
    if (err.name === 'ValidationError') {
      const msgs = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ message: 'Erro de validação', errors: msgs });
    }
    return res.status(500).json({ message: err.message });
  }
};

exports.deleteSequencial = async (req, res) => {
  try {
    const seq = await Sequencial.findByIdAndDelete(req.params.id);
    if (!seq) return res.status(404).json({ message: 'Sequencial não encontrado' });
    return res.json({ message: 'Sequencial removido com sucesso' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
