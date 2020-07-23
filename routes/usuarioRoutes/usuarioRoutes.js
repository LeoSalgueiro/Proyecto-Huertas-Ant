const mongoose = require('mongoose');
const Usuario = mongoose.model('usuario'); //utilizacion del modelo con nombre usuario del archivo Usuario.js
mongoose.set('useFindAndModify', false);
const userService = require('./usuarioService')




module.exports = (app) => {

  app.post('/api/authenticate', async (req, res, next) =>{
    //console.log(req.body.params)
    userService.authenticate(req.body.params)
      .then(user => user ? res.json(user) : res.status(400).json({ message: 'Usuario o contraseña incorrectos' }))
      .catch(err => next(err));
  })

  app.get(`/api/usuario`, async (req, res) => {
    console.log('entra al routes')
    console.log(req.query.email)
    console.log(req.query.password)
    let usuario = await Usuario.find({email: req.query.email, password: req.query.password}); //modificar para que lo que llega en req (son os parametros) busque en la db por esa info
    return res.status(200).send(usuario);
  });

  app.post(`/api/usuario`, async (req, res, next) => {
    console.log('entra al routes2')
    
    userService.create(req.body)
      .then(() => res.json({}))
      .catch(err => next(err));
    //
    /*
    let usuario = await Usuario.create(req.body);
    return res.status(201).send({
      error: false,
      usuario
    })
    */
  })

  app.put(`/api/usuario/`, async (req, res) => {
    //const {nombreUser} = req.params;
    
    const email = req.body.params.email
    const password = req.body.params.password
    console.log('numero 3: ' + email)
    console.log('new pass: ' + password)
    
    let usuario = await Usuario.findOneAndUpdate({email:email}, {password:password})
    //let usuario = await Usuario.findByIdAndUpdate(email, req.body);

    return res.status(202).send({
      error: false,
      usuario
    })

  });

  app.delete(`/api/usuario/:nombreUser`, async (req, res) => {
    const {nombreUser} = req.params;

    let usuario = await Usuario.findByIdAndDelete(nombreUser);

    return res.status(202).send({
      error: false,
      usuario
    })

  })

}