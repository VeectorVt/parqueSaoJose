const Andamento = require('./andamento.model')

exports.returnAllAndamentos = async (req, res) => { 
  try{
    const andamento = await Andamento.find()
  
    await res.json(andamento)
  }catch(error){
    res.status(400).json({ message:err});
  }
  }