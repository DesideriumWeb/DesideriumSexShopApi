const express = require("express");
const { saveCategory , getAllCategories , getCategoryById , updateCategory , deleteCategory} = require("../controllers/categoryController");
const verifyToken = require("../middleware/validateToken");

const router = express.Router();

// Crear categoría
router.post('/categories',verifyToken, saveCategory);

// Obtener todas las categorías
router.get('/categories', verifyToken, getAllCategories);

// Obtener categoría por ID
router.get('/categories/:id', verifyToken, getCategoryById);

// Actualizar categoría
router.put('/categories/:id', verifyToken, updateCategory);

// Eliminar categoría
router.delete('/categories/:id', verifyToken, deleteCategory);

module.exports = router;
