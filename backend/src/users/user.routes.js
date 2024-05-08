/*file:user.routes.js
*Descrição:arquivo responsável pelas rotas do User
*Data:07/06/2021
*Author:Veector
*/


const express = require('express')
const router = express.Router()
const userController = require('./users.controllers')
const auth = require('../middlewares/auth')

//===> Rota responsável por criar um novo 'User' (POST) localhost:3000/api/v1/register

router.post('/register' , userController.registerNewUser)

// ==> Rota responsável por realizar um novo login 'User': (POST): localhost:3000/api/v1/login

router.post('/login'  , userController.loginUser)

// ==> Rota responsável por retornar o perfil/profile do 'User': (GET): localhost:3000/api/v1/userProfile
router.get('/userProfile' , auth , userController.returnUserProfile)

router.get('/users' ,userController.returnAllUsers)

module.exports = router
