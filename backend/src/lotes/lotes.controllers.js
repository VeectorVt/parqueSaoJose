const Lotes = require('./lotes.model')

exports.returnAllLotes = async (req, res) => { 
  try{
    const lotes = await Lotes.find()
  
    await res.json(lotes)
  }catch(error){
    res.status(400).json({ message:err});
  }
  }