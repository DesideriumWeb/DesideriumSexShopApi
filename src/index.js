const express = require("express");
const mongoose = require("mongoose");
var cors = require('cors')
require("dotenv").config();
const userRoute = require("./routes/user");
const userLogin = require('./routes/userLogin')
const productosRoute = require("./routes/productos");

const validatetoken = require('./middleware/validateToken');
const validateRol = require('./middleware/validateRol');


// settings
const app = express();
const port = process.env.PORT || 5000;

// middlewares
app.use(express.json());
app.use(cors());
app.use("/api", productosRoute);
app.use("/api", userLogin);
app.use("/api/:id",validatetoken,validateRol, userRoute);


// routes
app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

// mongodb connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.error(error));

// server listening
app.listen(port, () => console.log("Server listening to", port));
