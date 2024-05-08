const Sequencial = require('./sequencial.model')

exports.returnAllSequencials = async (req, res) => { 
  try{
    const sequencial = await Sequencial.find()
  
    await res.json(sequencial)
  }catch(error){
    res.status(400).json({ message:err});
  }
  }