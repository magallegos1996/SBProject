const mongoose = require ('mongoose');
const {Schema} = require('mongoose');
const Comentario = require('../models/Comentario');
const mongoosePaginate = require('mongoose-paginate-v2');

const Imagen = new Schema({
    id: String,
    nombre: String,
    path: String,
    tipoImagen: String,
    titulo: String,
    descripcion: String,
    fechaSubida: String,
    horaSubida: String,
    subidoPor: String,
    comentarios: [Comentario]
});

Imagen.plugin(mongoosePaginate);

module.exports = mongoose.model('Imagen', Imagen);