/* eslint no-use-before-define: 2 */

/*file:server.js
*Descrição:arquivo responsável por toda configuração e execução da aplicação (o servidor no backend)
*Data:04/06/2021
*Author:Veector
*/

const app = require('./src/app');
const port = process.env.port || 3000;

app.listen(port, () => {
    console.log('Aplicação executando na porta.... ', port);
})

