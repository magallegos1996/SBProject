const mongoose = require ('mongoose');
const {Schema} = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Usuario = new Schema({
    id: String,
    nombre: String,
    avatarPath: String
});

Usuario.plugin(mongoosePaginate);

module.exports = mongoose.model('Usuario', Usuario);