const Baixa = require('./baixa.model')

exports.returnAllBaixas = async (req, res) => { 
  try{
    const baixas = await Baixa.find()
  
    await res.json(baixas)
  }catch(error){
    res.status(400).json({ message:err});
  }
  }