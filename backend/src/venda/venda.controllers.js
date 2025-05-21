// controllers/vendaController.js
const mongoose = require('mongoose');
const Venda = require('./venda.model');

const DEFAULT_PAGE_SIZE = 25;


const Lote = require('../lotes/lotes.model');

async function resolveLote(req, res, next) {
  const { lote: loteNum, quadra } = req.body;
  if (loteNum && quadra) {
    const loteDoc = await Lote.findOne({ lote: loteNum, quadra });
    if (!loteDoc) {
      return res.status(400).json({ message: 'Lote não encontrado para número/quadra informados' });
    }
    req.body.lote = loteDoc._id;
  }
  next();
}



// Helper para aplicar populates
const applyPopulates = (query) =>
  query
    .populate('lote')
    .populate('baixas')
    .populate({ path: 'sequenciais', populate: 'codigo_andamento' });

exports.createVenda = async (req, res) => {
  try {
    const venda = await Venda.create(req.body);
    // já popular o novo documento
    const fullVenda = await applyPopulates(Venda.findById(venda._id));
    return res.status(201).json(fullVenda);
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ message: 'Erro de validação', errors: messages });
    }
    return res.status(500).json({ message: err.message });
  }
};

exports.getAllVendas = async (req, res) => {
  try {
    const vendas = await applyPopulates(Venda.find());
    return res.json(vendas);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getVendaById = async (req, res) => {
  try {
    const venda = await applyPopulates(Venda.findById(req.params.id));
    if (!venda) return res.status(404).json({ message: 'Venda não encontrada' });
    return res.json(venda);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.updateVenda = async (req, res) => {
  try {
    const venda = await Venda.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!venda) return res.status(404).json({ message: 'Venda não encontrada' });

    // retornar populado
    const fullVenda = await applyPopulates(Venda.findById(venda._id));
    return res.json(fullVenda);
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ message: 'Erro de validação', errors: messages });
    }
    return res.status(500).json({ message: err.message });
  }
};

exports.deleteVenda = async (req, res) => {
  try {
    const venda = await Venda.findByIdAndDelete(req.params.id);
    if (!venda) return res.status(404).json({ message: 'Venda não encontrada' });
    return res.json({ message: 'Venda removida com sucesso' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.paginationVenda = async (req, res) => {
  try {
    const size = parseInt(req.query.size, 10) || DEFAULT_PAGE_SIZE;
    const cursor = req.query.cursor || null;
    const prevCursor = req.query.prevCursor || null;
    const lastPage = req.query.lastPage === 'true';
    const firstPage = req.query.firstPage === 'true';

    // filtros opcionais
    const baseFilter = {};
    if (req.query.quadra) baseFilter.quadra = req.query.quadra;
    if (req.query.lote)   baseFilter.lote = req.query.lote;

    const totalCount = await Venda.countDocuments(baseFilter);
    const totalPages = Math.ceil(totalCount / size);

    // achar primeiro e último _id dentro do filtro
    const firstItem = await Venda.findOne(baseFilter).sort({ _id: 1 }).select('_id');
    const lastItem  = await Venda.findOne(baseFilter).sort({ _id: -1 }).select('_id');

    let query = Venda.find(baseFilter);
    let skip, items;

    if (lastPage) {
      const remainder = totalCount % size;
      skip = remainder === 0 ? totalCount - size : totalCount - remainder;
      items = await query.sort({ _id: 1 }).skip(skip).limit(size);
    }
    else if (firstPage) {
      items = await query.sort({ _id: 1 }).limit(size);
    }
    else if (cursor) {
      query = query.where('_id').gt(mongoose.Types.ObjectId(cursor));
      items = await query.sort({ _id: 1 }).limit(size);
    }
    else if (prevCursor) {
      query = query.where('_id').lt(mongoose.Types.ObjectId(prevCursor));
      items = await query.sort({ _id: -1 }).limit(size);
      items = items.reverse();
    }
    else {
      items = await query.sort({ _id: 1 }).limit(size);
    }

    // popular resultados
    items = await applyPopulates(Venda.find({ _id: { $in: items.map(i => i._id) } }));

    const nextCursor = items.length ? items[items.length - 1]._id.toString() : null;
    const prevCur    = items.length ? items[0]._id.toString() : null;

    const atFirst = prevCur === firstItem?._id.toString();
    const atLast  = nextCursor === lastItem?._id.toString();

    return res.json({
      totalCount,
      totalPages,
      pageSize: size,
      items,
      nextCursor,
      prevCursor: prevCur,
      hasMoreNext: !!nextCursor && !atLast,
      hasMorePrev: !!prevCur   && !atFirst
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
