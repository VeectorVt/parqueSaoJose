/*file:index.js
*Descrição:arquivo responsável pela rota default da 'api'
*Data:04/06/2021
*Author:Veector
*/

const express = require('express')

 const router = express.Router()
 
 router.get('/api/v1' , (req, res) =>{
   res.status(200).send({
       sucess:true,
       message:'Seja bem vindo(a) a API Node.js + Mongodb + Azure' ,
       version:'1.0.0' 
   })
 })

 module.exports = router;
 


