const productosSchema = require("../models/productsModel");

module.exports = {
  getProducts: async (req, res) => {
    try {
      const { categoria } = req.params;

    //   // Verifica si la categoría existe en el modelo
    //   const categoriasExistentes = Object.keys(ProductosModel.schema.paths);
    //   if (!categoriasExistentes.includes(categoria)) {
    //     return res.status(404).json({ error: "Categoría no encontrada" });
    //   }

      // Recupera los productos de la categoría específica
      const productos = await productosSchema.find({
        [`${categoria}`]: { $exists: true },
      });

      if (productos.length > 0) {
        return res.json(productos.map((producto) => producto[categoria]));
      } else {
        return res
          .status(404)
          .json({ error: "No hay productos en la categoría especificada" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
  },
};
//   // create producto lenceria
// router.post("/lenceria", (req, res) => {
//     const lenceria = lenceriaSchema(req.body);
//     lenceria
//       .save()
//       .then((data) => res.json(data))
//       .catch((error) => res.json({ message: error }));
//   });

//   // get all productos lenceria

//   // get producto id lenceria
//   router.get("/lenceria/:id", (req, res) => {
//     const { id } = req.params;
//     lenceriaSchema
//       .findById(id)
//       .then((data) => res.json(data))
//       .catch((error) => res.json({ message: error }));
//   });

//   // delete a producto lenceria
//   router.delete("/lenceria/:id", (req, res) => {
//     const { id } = req.params;
//     lenceria
//       .remove({ _id: id })
//       .then((data) => res.json(data))
//       .catch((error) => res.json({ message: error }));
//   });

//   // update a producto lenceria
//   router.put("/lenceria/:id", (req, res) => {
//     const { id } = req.params;
//     const { imagePath,name, description, precio, title} = req.body;
//     lenceriaSchema
//       .updateOne({ _id: id }, { $set: { imagePath,name, description, precio, title} })
//       .then((data) => res.json(data))
//       .catch((error) => res.json({ message: error }));
//   });
