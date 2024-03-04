

/*file:db.config.js
*Descrição:arquivo responsável por fazer a conexão com a base de dados:MongoDB
*Data:04/06/2021
*Author:Veector
*/



const dotenv = require('dotenv')

dotenv.config()

module.exports = {
    local:{
       
        localDatabaseUrl: process.env.DB_URI ,
        secret:'password'

    } 
}




