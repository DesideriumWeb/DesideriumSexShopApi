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
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true
  },
  telefono: {
    type: String,
    required: true
  },
  ciudad: {
    type: String,
    required: true
  },
  departamento: {
    type: String,
    required: true
  },
  direccionResidencia: {
    type: String,
    required: true
  },
  fechaNacimiento: {
    type: Date,
    required: true
  },
  fechaRegistro: {
    type: Date,
    required: true
  }, 
  password:{
    type: String,
    required: true
  },
  producto:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Lenceria',
    autopopulate: true
  }]
});
userSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model('User', userSchema);