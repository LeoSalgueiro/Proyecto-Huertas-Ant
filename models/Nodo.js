const mongoose = require('mongoose');
const {Schema} = mongoose;

//esquema de perfil de usuario
const nodoSchema = new Schema({
    nombre: String,
    tipo: String,
    conexiones: Array,
    email: String,
    descripcion: String,
    fechaAlta: String

})

mongoose.model('nodo', nodoSchema);//exportacion del modelo con nombre usuario