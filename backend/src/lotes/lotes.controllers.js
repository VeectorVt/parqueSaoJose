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
    //  const token = await newAplicador.generateAuthToken();
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

exports.filterByQuadraOrLote = async (req, res) => {
  try {
    const { quadra, lote } = req.query; // Puxando de query params agora!

    // Se nenhum parâmetro for enviado, retorna erro
    if (!quadra && !lote) {
      return res.status(400).json({ message: 'É necessário informar quadra, lote ou ambos.' });
    }

    // Montar o filtro dinamicamente
    let filtro = {};
    if (quadra) {
      filtro.quadra = quadra;
    }
    if (lote) {
      filtro.lote = lote;
    }

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

