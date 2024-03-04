/*file:auth.js
*Descrição: arquivo responsável por confirmar se um determinado(a) 'User' tem autorização
 * acessar um determinado recurso.
*Data:07/06/2021
*Author:Veector
*/

const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.replace('Bearer ', '')
        console.log(token)

        const decoded = jwt.verify(token, 'secret')
         req.userData = decoded

        next()
    } catch (err) {
        res.status(401).json({message:`Falha na autenticação. ${err}`})
    }
}