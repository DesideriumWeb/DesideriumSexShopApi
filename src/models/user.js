const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
  rol:{
    type: String,
    enum: ['ADMINISTRADOR','CLIENTE'],
    default: 'CLIENTE',
  },
  name: {
    type: String,
    required: true,
  },
  fechaNacimiento: {
    type: Date,
    required: true
  },
  fechaRegistro: {
    type: Date,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  producto:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Producto',
    autopopulate: true
  }]
});
userSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('User', userSchema);