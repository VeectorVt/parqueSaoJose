const mongoose = require('mongoose');
const Venda = require('./venda.model');
const Baixa = require('../baixa/baixa.model');
const Sequencial = require('../sequencial/sequencial.model');
const Lote = require('../lote/lote.model');
const DEFAULT_PAGE_SIZE = 25;

// Função para buscar lote por quadra e número
const findLote = async (quadra, lote) => {
  return await Lote.findOne({ quadra, lote });
};

const enrichVenda = async (vendaDoc) => {
  const venda = vendaDoc.toObject(); // transforma em objeto puro

  venda.lote_info = await Lote.findById(venda.lote_id);
  // Buscar lote por quadra + número
  venda.lote = await findLote(venda.quadra, venda.lote);

  // Buscar baixas por nr_documento
  venda.baixas = await Baixa.find({ nr_documento: venda.nr_documento });

  // Buscar sequenciais por chave (equivalente a nr_documento)
  venda.sequenciais = await Sequencial.find({ chave: venda.nr_documento }).populate('codigo_andamento');

  return venda;
};

exports.createVenda = async (req, res) => {
  try {
    // Supondo que req.body.lote e req.body.quadra vêm do frontend
    const loteDoc = await Lote.findOne({ quadra: req.body.quadra, lote: req.body.lote });
    if (!loteDoc) return res.status(400).json({ message: 'Lote não encontrado' });

    const vendaData = {
      ...req.body,
      lote_id: loteDoc._id, // novo campo
    };

    const venda = await Venda.create(vendaData);

    // Criação automática de Baixa relacionada
    await Baixa.create({
      venda: venda._id,
      nr_documento: venda.nr_documento,
      parcela: venda.parcela,
      codigo_conta: venda.codigo_conta,
      nome: venda.nome,
      // outros campos necessários...
    });

    // Criação automática de Sequencial relacionada
    await Sequencial.create({
      venda: venda._id,
      chave: venda.nr_documento,
      andamento: '', // ou algum valor padrão
      // outros campos necessários...
    });

    const fullVenda = await enrichVenda(venda);
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
    const vendas = await Venda.find();
    const enriched = await Promise.all(vendas.map(enrichVenda));
    return res.json(enriched);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getVendaById = async (req, res) => {
  try {
    const { id } = req.params;
    const venda = await Venda.findById(id);
    if (!venda) return res.status(404).json({ error: 'Venda não encontrada' });

    const fullVenda = await enrichVenda(venda);
    return res.json(fullVenda);
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao buscar venda' });
  }
};

exports.updateVenda = async (req, res) => {
  try {
    let updateData = { ...req.body };

    // Só busca e associa o lote_id se não existir
    if (!updateData.lote_id && updateData.quadra && updateData.lote) {
      const loteDoc = await Lote.findOne({ quadra: updateData.quadra, lote: updateData.lote });
      if (loteDoc) updateData.lote_id = loteDoc._id;
    }

    const venda = await Venda.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    if (!venda) return res.status(404).json({ message: 'Venda não encontrada' });

    // Atualização automática de Baixa relacionada
    await Baixa.findOneAndUpdate(
      { venda: venda._id },
      {
        nr_documento: venda.nr_documento,
        parcela: venda.parcela,
        codigo_conta: venda.codigo_conta,
        nome: venda.nome,
        // outros campos necessários...
      },
      { new: true, upsert: true }
    );

    // Atualização automática de Sequencial relacionada
    await Sequencial.findOneAndUpdate(
      { venda: venda._id },
      {
        chave: venda.nr_documento,
        andamento: '', // ou algum valor atualizado
        // outros campos necessários...
      },
      { new: true, upsert: true }
    );

    const fullVenda = await enrichVenda(venda);
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

    const baseFilter = {};
    if (req.query.quadra) baseFilter.quadra = req.query.quadra;
    if (req.query.lote) baseFilter.lote = req.query.lote;

    const totalCount = await Venda.countDocuments(baseFilter);
    const totalPages = Math.ceil(totalCount / size);

    const firstItem = await Venda.findOne(baseFilter).sort({ _id: 1 }).select('_id');
    const lastItem = await Venda.findOne(baseFilter).sort({ _id: -1 }).select('_id');

    let query = Venda.find(baseFilter);
    let skip, items;

    if (lastPage) {
      const remainder = totalCount % size;
      skip = remainder === 0 ? totalCount - size : totalCount - remainder;
      items = await query.sort({ _id: 1 }).skip(skip).limit(size);
    } else if (firstPage) {
      items = await query.sort({ _id: 1 }).limit(size);
    } else if (cursor) {
      query = query.where('_id').gt(mongoose.Types.ObjectId(cursor));
      items = await query.sort({ _id: 1 }).limit(size);
    } else if (prevCursor) {
      query = query.where('_id').lt(mongoose.Types.ObjectId(prevCursor));
      items = await query.sort({ _id: -1 }).limit(size);
      items = items.reverse();
    } else {
      items = await query.sort({ _id: 1 }).limit(size);
    }

    // Aplicar enrich
    items = await Promise.all(items.map(enrichVenda));

    const nextCursor = items.length ? items[items.length - 1]._id.toString() : null;
    const prevCur = items.length ? items[0]._id.toString() : null;

    const atFirst = prevCur === firstItem?._id.toString();
    const atLast = nextCursor === lastItem?._id.toString();

    return res.json({
      totalCount,
      totalPages,
      pageSize: size,
      items,
      nextCursor,
      prevCursor: prevCur,
      hasMoreNext: !!nextCursor && !atLast,
      hasMorePrev: !!prevCur && !atFirst
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};