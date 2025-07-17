const Lote = require('../lotes/lotes.model');

async function resolveLote(req, res, next) {
  const { lote: loteNum, quadra } = req.body;
  if (loteNum && quadra) {
    const loteDoc = await Lote.findOne({ lote: loteNum, quadra });
    if (!loteDoc) {
      return res.status(400).json({ message: 'Lote não encontrado para número/quadra informados' });
    }
    req.body.lote = loteDoc._id;
  }
  next();
}
module.exports = resolveLote;
