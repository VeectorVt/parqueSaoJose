const Lancamento = require('./lancamento.model')

exports.returnAllLancamentos = async (req, res) => { 
  try{
    const lancamento = await Lancamento.find()
  
    await res.json(lancamento)
  }catch(error){
    res.status(400).json({ message:err});
  }
  }