const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definición del esquema de Categoría
const categorySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  estado: { type: Number, required: false }
});

const CategoryModel = mongoose.model('Category', categorySchema);

module.exports = CategoryModel;
