const mongoose = require("mongoose");

const productoSchema = mongoose.Schema({
  imagePath: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  precio: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  cantidad: {
    type: Number,
  },
});

module.exports = mongoose.model('Producto',productoSchema);