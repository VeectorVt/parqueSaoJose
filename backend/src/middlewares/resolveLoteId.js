const Lote = require('../lotes/lotes.model');

async function resolveLote(req, res, next) {
  const { lote, quadra } = req.body;
  if (lote && quadra) {
    const quadraBusca = String(quadra).replace(/^0+/, '');
    const loteBusca = String(lote).replace(/^0+/, '');
    const loteDoc = await Lote.findOne({
      $expr: {
        $and: [
          {
            $eq: [
              { $ltrim: { input: { $toString: "$quadra" }, chars: "0" } },
              quadraBusca
            ]
          },
          {
            $eq: [
              { $ltrim: { input: { $toString: "$lote" }, chars: "0" } },
              loteBusca
            ]
          }
        ]
      }
    });
    if (!loteDoc) {
      return res.status(400).json({ message: 'Lote não encontrado para número/quadra informados' });
    }
    req.body.lote_id = loteDoc._id; // Adiciona lote_id, não sobrescreve lote
  }
  next();
}
module.exports = resolveLote;