const express = require("express");
const { saveCategory , getAllCategories , getCategoryById , updateCategory , deleteCategory} = require("../controllers/categoryController");
const router = express.Router();

// Crear categoría
router.post('/categories', saveCategory);

// Obtener todas las categorías
router.get('/categories', getAllCategories);

// Obtener categoría por ID
router.get('/categories/:id', getCategoryById);

// Actualizar categoría
router.put('/categories/:id', updateCategory);

// Eliminar categoría
router.delete('/categories/:id', deleteCategory);

module.exports = router;
