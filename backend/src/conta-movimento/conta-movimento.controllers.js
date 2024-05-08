const ContaMovimento = require('./conta-movimento.model')

exports.returnAllContasMovimento = async (req, res) => { 
  try{
    const contasMovimento = await ContaMovimento.find()
  
    await res.json(contasMovimento)
  }catch(error){
    res.status(400).json({ message:err});
  }
  }