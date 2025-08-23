const mongoose = require('mongoose');

const Lotes = require('./lotes.model')

exports.returnAllLotes = async (req, res) => {
  try {
    const lotes = await Lotes.find()

    await res.json(lotes)
  } catch (error) {
    res.status(400).json({ message: err });
  }
}


exports.registerNewLote = async (req, res) => {
  try {
    const newLote = new Lotes(req.body);
    const lote = await newLote.save();

    res.status(201).json({ message: ' Lote cadastrado com sucesso', lote });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({ message: 'Erro de validação', errors: messages });
    }
    res.status(400).json({ message: 'Erro ao cadastrar lote', error: err.message });
  }

};

exports.returnEditLote = async (req, res) => {
  try {
    const loteAtualizado = await Lotes.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!loteAtualizado) {
      return res.status(404).json({ message: 'Lote não encontrado' });
    }

    return res.status(200).json({
      message: 'Lote atualizado com sucesso',
      lote: loteAtualizado
    });
  } catch (error) {
    console.error('Erro ao atualizar lote:', error);
    return res.status(500).json({
      message: 'Erro ao atualizar lote',
      error: error.message
    });
  }
};


exports.deleteLote = async (req, res) => {
  try {
    const lote = await Lotes.findByIdAndDelete(req.params.id);

    if (!lote) {
      return res.status(404).json({ message: 'Lote não encontrado' });
    }

    return res.status(200).json({ message: 'Lote apagado  com sucesso', lote });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao apagar lote', error: error.message });
  }
};

exports.paginationLote = async (req, res) => {
  try {
    const size = parseInt(req.query.size, 10) || 25;
    const cursor = req.query.cursor || null;
    const prevCursor = req.query.prevCursor || null;
    const lastPage = req.query.lastPage || null;
    const firstPage = req.query.firstPage || null;

    // if (lote) baseFilter.lote_num = Number(lote);
    let exprs = [];

    if (req.query.quadra) {
      const quadraBusca = String(req.query.quadra).replace(/^0+/, '');
      exprs.push({
        $eq: [
          { $ltrim: { input: { $toString: "$quadra" }, chars: "0" } },
          quadraBusca
        ]
      });
    }

    if (req.query.lote) {
      const loteBusca = String(req.query.lote).replace(/^0+/, '');
      exprs.push({
        $eq: [
          { $ltrim: { input: { $toString: "$lote" }, chars: "0" } },
          loteBusca
        ]
      });
    }

       if (req.query.situacao) {
      const situacaoBusca = String(req.query.situacao).replace(/^0+/, '');
      exprs.push({
        $eq: [
          { $ltrim: { input: { $toString: "$codigo_situacao" }, chars: "0" } },
          situacaoBusca
        ]
      });
    }

    let baseFilter = {};
    if (exprs.length === 1) {
      baseFilter.$expr = exprs[0];
    } else if (exprs.length > 1) {
      baseFilter.$expr = { $and: exprs };
    }


    let queryFilter = { ...baseFilter };

    const totalCount = await Lotes.countDocuments(queryFilter);
    const totalPages = Math.ceil(totalCount / size);

    let items = [];
    let sortOrder = { _id: 1 }; // padrão crescente

    const firstItem = await Lotes.findOne(queryFilter).sort({ _id: 1 }).select('_id');
    const lastItem = await Lotes.findOne(queryFilter).sort({ _id: -1 }).select('_id');



    if (lastPage) {

      const remainder = totalCount % size;
      const skipCount = remainder === 0 ? totalCount - size : totalCount - remainder;
      items = await Lotes.find(queryFilter)
        .sort({ _id: 1 })
        .skip(skipCount)
        .limit(size);



    } else if (firstPage) {
      // Pega os primeiros `size` itens (primeira página)
      items = await Lotes.find(queryFilter)
        .sort({ _id: 1 }) // começo para o fim
        .limit(size);
    } else if (cursor) {
      // Próxima página
      queryFilter._id = { $gt: mongoose.Types.ObjectId(cursor) };
      items = await Lotes.find(queryFilter)
        .sort({ _id: 1 })
        .limit(size);
    } else if (prevCursor) {
      // Página anterior
      queryFilter._id = { $lt: mongoose.Types.ObjectId(prevCursor) };
      items = await Lotes.find(queryFilter)
        .sort({ _id: -1 })
        .limit(size);

      items = items.reverse(); // reorganiza para enviar na ordem crescente
    } else {
      // Primeira busca inicial sem cursor
      items = await Lotes.find(queryFilter)
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
      message: 'Lotes encontrados com sucesso',
      items,
      pageSize: size,
      nextCursor: nextCursorCalc,
      prevCursor: prevCursorCalc,
      hasMoreNext: nextCursorCalc !== null && !verifyLastPage,
      hasMorePrev: prevCursorCalc !== null && !verifyFirstPage
    });

  } catch (error) {
    console.error('Erro ao buscar lotes:', error);
    return res.status(500).json({ message: 'Erro ao buscar lotes', error: error.message });
  }
};

exports.filterByQuadraOrLote = async (req, res) => {
  try {
    const { quadra, lote } = req.query; // Puxando de query params agora!

    // Se nenhum parâmetro for enviado, retorna erro
    if (!quadra && !lote) {
      return res.status(400).json({ message: 'É necessário informar quadra, lote ou ambos.' });
    }

    // Montar o filtro dinamicamente
    let filtro = {};
    if (quadra) filtro.quadra = quadra;
    if (lote) filtro.lote = lote;


    // Realiza a busca com o filtro montado
    const lotes = await Lotes.find(filtro);

    if (lotes.length === 0) {
      return res.status(404).json({ message: 'Nenhum lote encontrado com os critérios fornecidos.' });
    }

    return res.status(200).json({ message: 'Lote(s) encontrado(s) com sucesso.', lotes });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao buscar lote(s).', error: error.message });
  }
};

