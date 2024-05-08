const Venda = require('./venda.model')

exports.returnAllVendas = async (req, res) => { 
  try{
    const venda = await Venda.find()
  
    await res.json(venda)
  }catch(error){
    res.status(400).json({ message:err});
  }
  }