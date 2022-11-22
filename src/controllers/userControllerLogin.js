
const userSchema = require("../models/user");
// validation de esquema
const Joi = require('@hapi/joi');
// libreria para encriptar contrasenia
const bcrypt = require('bcrypt');
// libreria jsonWebtoken
const jwt = require('jsonwebtoken');

// validacion de esquema para registrar un usuario
const schemaRegister = Joi.object({
    rol: Joi.string().min(3).max(255).required(),
    name: Joi.string().min(6).max(255).required(),
    fechaNacimiento: Joi.date().required(),
    fechaRegistro: Joi.date().required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
})

// validacion de esquema para login un usuario
const schemaLogin = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
})

// create user
module.exports = {
    registerUser: async (req, res) => {


        // validacion del esquema para registrar un usuario
        const { error } = schemaRegister.validate(req.body)
        if (error) {
            return res.status(400).json({ error: error.details[0].message })
        }
        // validacion si el email ya existe
        const emailExiste = await userSchema.findOne({ email: req.body.email })
        if (emailExiste) return res.status(400).json({ error: true, mensaje: 'El Email ya existe' })

        // hash contraseña
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);

        const user = new userSchema(
            {
                rol: req.body.rol,
                name: req.body.name,
                fechaNacimiento: req.body.fechaNacimiento,
                fechaRegistro: req.body.fechaRegistro,
                email: req.body.email,
                password: password
            });

        user
            .save()
            .then((data) => res.json(data))
            .catch((error) => res.json({ message: error + "Error al guardar el usuario" }));
    },

    loginUser: async (req, res) => {
        // validacion del esquema para registrar un usuario
        const { error } = schemaLogin.validate(req.body)
        if (error) {
            return res.status(400).json({ error: error.details[0].message })
        }

        const userr = await userSchema.findOne({ email: req.body.email });
        if (!userr) return res.status(400).json({ error: 'Usuario no encontrado' });

        const validPassword = await bcrypt.compare(req.body.password, userr.password);
        if (!validPassword) return res.status(400).json({ error: 'contraseña no válida' })


        // create token
        const token = jwt.sign({
            name: userr.name,
            id: userr._id
        }, process.env.TOKEN_SECRET,{expiresIn: 60 * 60 * 24 })

        res.json({
            error: null,
            data: 'exito bienvenido',
            token: token
        })


    },

}