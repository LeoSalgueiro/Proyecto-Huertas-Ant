const mongoose = require('mongoose');
const {Schema} = mongoose;

//esquema de perfil de usuario
const usuarioSchema = new Schema({
    foto: Array,
    nombre: String,
    apellido: String,
    dni: Number,
    password: String,
    email: String,
    direccion: String,
    fechaNac: String,
    nombreUser: String, //usuario (ejemplo: Leon3421)
    genero: String,
    hash: { type: String, required: true }

})

usuarioSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

mongoose.model('usuario', usuarioSchema);//exportacion del modelo con nombre usuario