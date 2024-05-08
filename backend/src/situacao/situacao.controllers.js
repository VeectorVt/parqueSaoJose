const Situacao = require('./situacao.model')

exports.returnAllSituacoes = async (req, res) => { 
  try{
    const situacao = await Situacao.find()
  
    await res.json(situacao)
  }catch(error){
    res.status(400).json({ message:err});
  }
  }