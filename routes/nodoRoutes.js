const mongoose = require('mongoose');
const Nodo = mongoose.model('nodo'); //utilizacion del modelo con nombre usuario del archivo Usuario.js
mongoose.set('useFindAndModify', false);
module.exports = (app) => {

  app.get(`/api/nodo`, async (req, res) => {
    console.log('entra al routes')
    console.log(req.query.email)
    console.log(req.query.nombre)
    let nodo = await Nodo.find({email: req.query.email, nombre: req.query.nombre}); //modificar para que lo que llega en req (son os parametros) busque en la db por esa info
    return res.status(200).send(nodo);
  });

  app.get(`/api/nodos`, async (req, res) => {
    
    console.log("este es el param: "+ req.query.email)
   
    let nodo = await Nodo.find({email: req.query.email}); //modificar para que lo que llega en req (son os parametros) busque en la db por esa info
    return res.status(200).send(nodo);
  });

  app.post(`/api/nodo`, async (req, res) => {
    console.log('entra al routes2 - nodo')
    
    let nodo = await Nodo.create(req.body);
    return res.status(201).send({
      error: false,
      nodo
    })
  })

  app.put(`/api/nodo/`, async (req, res) => {
    //const {nombreUser} = req.params;
    
    const email = req.body.params.email
    const conexion = req.body.params.conexion
    console.log('numero 3: ' + email)
    console.log('new pass: ' + conexion)
    
    let nodo = await Nodo.findOneAndUpdate({email:email}, {conexion:conexion})
    //let usuario = await Usuario.findByIdAndUpdate(email, req.body);

    return res.status(202).send({
      error: false,
      nodo
    })

  });

  app.delete(`/api/nodo/:nombreUser`, async (req, res) => {
    const {nombreUser} = req.params;

    let nodo = await Nodo.findByIdAndDelete(nombreUser);

    return res.status(202).send({
      error: false,
      nodo
    })

  })

}