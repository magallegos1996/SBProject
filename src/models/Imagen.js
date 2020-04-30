const mongoose = require ('mongoose');
const {Schema} = require('mongoose');

const Imagen = new Schema({
    id: String,
    imagen: String,
    titulo: String,
    descripcion: String,
    fechaSubida: String,
    subidoPor: String
});

module.exports = mongoose.model('Imagen', Imagen);