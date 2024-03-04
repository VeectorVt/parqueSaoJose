const Conta = require('./conta.model')

exports.returnAllContas = async (req, res) => { 
  try{
    const conta = await Conta.find()
  
    await res.json(conta)
  }catch(error){
    res.status(400).json({ message:err});
  }
  }