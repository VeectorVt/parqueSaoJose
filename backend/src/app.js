
/* file:app.js

*Descrição:arquivo responsável por toda configuração e execução da aplicação também da concentração de libs e das chamadas das rotas
*Data:04/06/2021
*Author:Veector
*/

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const mongooseConnection = require('./config/mongoose.Connection.config')

const app = express();

//= => Rotas da Api:
const index = require('./routes/index');
const userRoutes = require('./users/user.routes')
const lotesRoutes = require('./lotes/lotes.routes')
const andamentoRoutes = require('./andamento/andamento.routes')
const baixaRoutes = require('./baixa/baixa.routes')
const bancoRoutes = require('./banco/banco.routes')
const contaRoutes = require('./conta/conta.routes')
const contaMovimentoRoutes = require('./conta-movimento/conta-movimento.routes')
const lancamentoRoutes = require('./lancamento/lancamento.routes')
const sequencialRoutes = require('./sequencial/sequencial.routes')
const situacaoRoutes = require('./situacao/situacao.routes')
const vendaRoutes = require('./venda/venda.routes')

//Declarando as libs
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json' }));
app.use(cors());
app.use(morgan('dev'));

app.set('mongoose connection', mongooseConnection)

//Declarando as rotas
app.use(index);
app.use('/api/v1', userRoutes, lotesRoutes, andamentoRoutes, baixaRoutes, bancoRoutes, contaRoutes, contaMovimentoRoutes, lancamentoRoutes, sequencialRoutes, situacaoRoutes, vendaRoutes)





module.exports = app;


