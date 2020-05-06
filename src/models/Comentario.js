const {Schema} = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Comentario = new Schema({
    id: String,
    nombre: String,
    comentario: String,
    avatar: String,
});

Comentario.plugin(mongoosePaginate);

module.exports = Comentario;