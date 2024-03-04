/*file:db.config.js
*Descrição:arquivo responsável por fazer a conexão com a base de dados:MongoDB via mongoose
*Data:04/06/2021
*Author:Veector
*/

const express = require('express')
const mongoose = require('mongoose')


//= ==> Importar o arquivo:'db.config.js'
const database = require('./db.config'); //= ==> Conexão local da base de dados




mongoose.Promise = global.Promise;

//= ==> Conexão da base de dados
mongoose.connect(
    database.local.localDatabaseUrl,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    },
)
    .then(
        () => {

            console.log('A base de dados foi conectada com sucesso');
        }, (err) => {

            console.log(`erro ao conectar com a base de dados....: ${err}`);
            process.exit();
        },
    );



