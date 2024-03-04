const Banco = require('./banco.model')

exports.returnAllBancos = async (req, res) => { 
  try{
    const banco = await Banco.find()
  
    await res.json(banco)
  }catch(error){
    res.status(400).json({ message:err});
  }
  }