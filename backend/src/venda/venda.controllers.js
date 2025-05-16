const mongoose = require('mongoose');
const Venda = require('./venda.model')

exports.returnAllVendas = async (req, res) => {
  try {
    const venda = await Venda.find()

    await res.json(venda)
  } catch (error) {
    res.status(400).json({ message: err });
  }
}
exports.registerNewVenda = async (req, res) => {
  try {
    const newVenda = new Venda(req.body);
    const venda = await newVenda.save();

    res.status(201).json({ message: 'Venda cadastrada com sucesso', venda });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({ message: 'Erro de validação', errors: messages });
    }
    res.status(400).json({ message: 'Erro ao cadastrar venda', error: err.message });
  }
};

exports.returnEditVenda = async (req, res) => {
  try {
    const vendaAtualizada = await Venda.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!vendaAtualizada) {
      return res.status(404).json({ message: 'Venda não encontrada' });
    }

    return res.status(200).json({
      message: 'Venda atualizada com sucesso',
      venda: vendaAtualizada
    });
  } catch (error) {
    console.error('Erro ao atualizar venda:', error);
    return res.status(500).json({
      message: 'Erro ao atualizar venda',
      error: error.message
    });
  }
};

exports.deleteVenda = async (req, res) => {
  try {
    const venda = await Venda.findByIdAndDelete(req.params.id);

    if (!venda) {
      return res.status(404).json({ message: 'Venda não encontrada' });
    }

    return res.status(200).json({ message: 'Venda apagada com sucesso', venda });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao apagar venda', error: error.message });
  }
};

exports.paginationVenda = async (req, res) => {
  try {
    const size = parseInt(req.query.size, 10) || 25;
    const cursor = req.query.cursor || null;
    const prevCursor = req.query.prevCursor || null;
    const lastPage = req.query.lastPage || null;
    const firstPage = req.query.firstPage || null;

    // Adapte os filtros conforme os campos do schema de Venda
    const { quadra, lote } = req.query;

    const baseFilter = {};
    if (quadra && typeof quadra == 'string') baseFilter.quadra = quadra.trim();
    if (quadra && typeof quadra == 'number') baseFilter.quadra = Number(quadra);
    if (lote && typeof lote == 'string') baseFilter.lote = lote.trim();
    if (lote && typeof lote == 'number') baseFilter.lote = Number(lote);

    let queryFilter = { ...baseFilter };

    const totalCount = await Venda.countDocuments(queryFilter);
    const totalPages = Math.ceil(totalCount / size);

    let items = [];
    let sortOrder = { _id: 1 };

    const firstItem = await Venda.findOne(queryFilter).sort({ _id: 1 }).select('_id');
    const lastItem = await Venda.findOne(queryFilter).sort({ _id: -1 }).select('_id');

    if (lastPage) {
      const remainder = totalCount % size;
      const skipCount = remainder === 0 ? totalCount - size : totalCount - remainder;
      items = await Venda.find(queryFilter)
        .sort({ _id: 1 })
        .skip(skipCount)
        .limit(size);
    } else if (firstPage) {
      items = await Venda.find(queryFilter)
        .sort({ _id: 1 })
        .limit(size);
    } else if (cursor) {
      queryFilter._id = { $gt: mongoose.Types.ObjectId(cursor) };
      items = await Venda.find(queryFilter)
        .sort({ _id: 1 })
        .limit(size);
    } else if (prevCursor) {
      queryFilter._id = { $lt: mongoose.Types.ObjectId(prevCursor) };
      items = await Venda.find(queryFilter)
        .sort({ _id: -1 })
        .limit(size);

      items = items.reverse();
    } else {
      items = await Venda.find(queryFilter)
        .sort({ _id: 1 })
        .limit(size);
    }

    const nextCursorCalc = items.length ? items[items.length - 1]._id.toString() : null;
    const prevCursorCalc = items.length ? items[0]._id.toString() : null;

    const verifyFirstPage = prevCursorCalc === firstItem?._id.toString();
    const verifyLastPage = nextCursorCalc === lastItem?._id.toString();

    return res.status(200).json({
      totalCount,
      totalPages,
      message: 'Vendas encontradas com sucesso',
      items,
      pageSize: size,
      nextCursor: nextCursorCalc,
      prevCursor: prevCursorCalc,
      hasMoreNext: nextCursorCalc !== null && !verifyLastPage,
      hasMorePrev: prevCursorCalc !== null && !verifyFirstPage
    });

  } catch (error) {
    console.error('Erro ao buscar vendas:', error);
    return res.status(500).json({ message: 'Erro ao buscar vendas', error: error.message });
  }
};

