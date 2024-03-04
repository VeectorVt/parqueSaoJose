/*file:users.controllers.js
*Descrição:arquivo responsável pelo CRUD(lógica) da classe:'User'
*Data:07/06/2021
*Author:Veector
*/

const User = require('./user.model')

//===> Async e Await


// ===> Método Responsável
exports.registerNewUser = async (req, res) => {
  try {
    // => Antes vamos fazer uma verificação se o usuário já possui algum e-mail já cadastrado:
    const isUser = await User.find({ email: req.body.email });
    console.log(isUser);
    if (isUser.length >= 1) {
      return res.status(409).json({ message: 'Atenção! Este e-mail já possui registro!' });
    }

    const newUser = new User(req.body);

    const user = await newUser.save();

    const token = await newUser.generateAuthToken(); // ==> Aqui chamaremos o método que criamos no model
    return res.status(201).json({ message: 'Usuário(a) criado(a) com sucesso!', user, token });


  } catch (err) {
    return res.status(400).json({ message: err });
  }
};
// ==> Método responsável por realizar um novo login 'User':
exports.loginUser = async (req, res) => {
  try {
    const email = req.body.email
    const password = req.body.password
    const user = await User.findByCredentials(email, password);
    
    if (!user) {
      return res.status(401).json({ error: 'Erro ao logar verifique suas credenciais de identifição' });
    }
    const token = await user.generateAuthToken()
    return res.status(201).json({ message: 'Usuário Logado com sucesso', user, token })

  } catch (err) {
    return res.status(400).json({ err })
  }
}

exports.returnUserProfile = async (req, res) => { 
  await res.json(req.userData)
}

exports.returnAllUsers = async (req, res) => { 
  try{
    const users = await User.find()
  
    await res.json(users)
  }catch(error){
    res.status(400).json({ message:err});
  }
  }

