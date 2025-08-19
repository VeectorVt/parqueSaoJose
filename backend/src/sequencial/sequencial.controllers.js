// controllers/sequencialController.js
const mongoose = require('mongoose');
const Sequencial = require('./sequencial.model');
const Venda = require('../venda/venda.model');
const Andamento = require('../andamento/andamento.model');

// Função para enriquecer sequencial (compatível com ObjectId e string)
const enrichSequencial = async (seq) => {
  const sequencial = seq.toObject ? seq.toObject() : seq;
  if (sequencial.codigo_andamento) {
    if (mongoose.Types.ObjectId.isValid(sequencial.codigo_andamento)) {
      // Novo: busca o andamento pelo ObjectId
      const andamento = await Andamento.findById(sequencial.codigo_andamento);
      sequencial.andamento_info = andamento;
    } else {
      // Antigo: apenas retorna a string
      sequencial.andamento_info = sequencial.codigo_andamento;
    }
  } else {
    sequencial.andamento_info = null;
  }
  return sequencial;
};

const applySequencialPopulates = (query) =>
  query
    .populate({ path: 'venda', populate: 'lote' })              // exibe venda + lote
    .populate('codigo_andamento');                             // exibe o andamento

exports.createSequencial = async (req, res) => {
  try {
    // Se for string, busca o andamento pelo campo 'codigo'
    let sequencialData = { ...req.body };
    if (
      sequencialData.codigo_andamento &&
      !mongoose.Types.ObjectId.isValid(sequencialData.codigo_andamento)
    ) {
      const andamento = await Andamento.findOne({ codigo: sequencialData.codigo_andamento });
      if (andamento) sequencialData.codigo_andamento = andamento._id;
    }

    const seq = await Sequencial.create(sequencialData);
    const fullSeq = await applySequencialPopulates(Sequencial.findById(seq._id));
    // Enriquecer para compatibilidade com dados antigos
    const enriched = await enrichSequencial(fullSeq);
    return res.status(201).json(enriched);
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
    const enriched = await Promise.all(
      (Array.isArray(seqs) ? seqs : [seqs]).map(enrichSequencial)
    );
    return res.json(enriched);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getSequencialById = async (req, res) => {
  try {
    const seq = await applySequencialPopulates(Sequencial.findById(req.params.id));
    if (!seq) return res.status(404).json({ message: 'Sequencial não encontrado' });
    const enriched = await enrichSequencial(seq);
    return res.json(enriched);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getSequenciaisByVenda = async (req, res) => {
  try {
    const seqs = await applySequencialPopulates(
      Sequencial.find({ venda: req.params.vendaId })
    );
    const enriched = await Promise.all(
      (Array.isArray(seqs) ? seqs : [seqs]).map(enrichSequencial)
    );
    return res.json(enriched);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.updateSequencial = async (req, res) => {
  try {
    let updateData = { ...req.body };
    if (
      updateData.codigo_andamento &&
      !mongoose.Types.ObjectId.isValid(updateData.codigo_andamento)
    ) {
      const andamento = await Andamento.findOne({ codigo: updateData.codigo_andamento });
      if (andamento) updateData.codigo_andamento = andamento._id;
    }

    const seq = await Sequencial.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    if (!seq) return res.status(404).json({ message: 'Sequencial não encontrado' });
    const fullSeq = await applySequencialPopulates(Sequencial.findById(seq._id));
    const enriched = await enrichSequencial(fullSeq);
    return res.json(enriched);
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
}