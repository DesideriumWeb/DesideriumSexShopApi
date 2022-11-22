const express = require("express");
const productoSchema = require("../models/producto");

const router = express.Router();

// create producto
router.post("/producto", (req, res) => {
  const producto = productoSchema(req.body);
  producto
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get all productos
router.get("/productos", (req, res) => {
   productoSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get producto id
router.get("/producto/:id", (req, res) => {
  const { id } = req.params;
  productoSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// delete a producto
router.delete("/producto/:id", (req, res) => {
  const { id } = req.params;
  producto
    .remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// update a producto
router.put("/producto/:id", (req, res) => {
  const { id } = req.params;
  const { imagePath,name, description, precio, title} = req.body;
  productoSchema
    .updateOne({ _id: id }, { $set: { imagePath,name, description, precio, title} })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
