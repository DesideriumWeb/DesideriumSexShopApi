
const userSchema = require("../models/user");
// validation de esquema
const Joi = require('@hapi/joi');
// libreria para encriptar contrasenia
const bcrypt = require('bcrypt');
const { google } = require("googleapis");
const { content } = require("googleapis/build/src/apis/content");
// libreria jsonWebtoken
const jwt = require('jsonwebtoken');
//objeto para enviar el mail de registro
const nodemailer = require('nodemailer');

// validacion de esquema para registrar un usuario
const schemaRegister = Joi.object({
    rol: Joi.string().min(3).max(255).required(),
    name: Joi.string().min(3).max(255).required(),
    lastName: Joi.string().min(3).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    telefono: Joi.string().min(6).max(255).required(),
    ciudad: Joi.string().min(3).max(255).required(),
    departamento: Joi.string().min(3).max(255).required(),
    direccionResidencia: Joi.string().min(3).max(255).required(),
    fechaNacimiento: Joi.date().required(),
    fechaRegistro: Joi.date().required(),
    password: Joi.string().min(3).max(1024).required()
})

// validacion de esquema para login un usuario
const schemaLogin = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
})

async function senMail(email) {
    const CLIENTD_ID = process.env.CLIENTD_ID
    const CLIENT_SECRET = process.env.CLIENT_SECRET
    const REFRESH_TOKEN = process.env.REFRESH_TOKEN
    const REDIRECT_URI = process.env.REDIRECT_URI
    const oAuth2Client = new google.auth.OAuth2(
        CLIENTD_ID,
        CLIENT_SECRET,
        REDIRECT_URI
    );
    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
    try {
        const accesToken = await oAuth2Client.getAccessToken();
        const transporter = nodemailer.createTransport({
            service: process.env.REACT_SERVICE,
            auth: {
                type: process.env.REACT_TYPE,
                user: process.env.REACT_USER,
                clientId: CLIENTD_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accesToken: accesToken

            },
        });
        const mailOptions = {
            from: "<desideriumsex@gmail.com>",
            to: email,
            subject: "Bienvenido a Desiderium Sex Shop",
            html: `<b> Bienvenido a Desiderium Sex shop , la mejor tienda erotica del pais, completa tu registro link </b>
            <a href="https://www.desideriumsexshop.com"> wwww.desideriumsexshop.com </a>`

        };
        const result = await transporter.sendMail(mailOptions);
     
        return result;
    } catch (error) {
        console.log("ERROR", error);
    }
}

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
                lastName: req.body.lastName,
                email: req.body.email,
                telefono: req.body.telefono,
                ciudad: req.body.ciudad,
                departamento: req.body.departamento,
                direccionResidencia: req.body.direccionResidencia,
                fechaNacimiento: req.body.fechaNacimiento,
                fechaRegistro: req.body.fechaRegistro,
                password: password
            });

           await user.save()
            .then((data) => {
                  senMail(req.body.email)
                .then(result => res.status(200).send({error: false, mensaje: 'Usuario guardado conexito, verifica tu correo electronico' }))
                .catch(error => console.log(error.message));
            })
            .catch((error) => res.json({ message: error + "Error al guardar el usuario" }));
   
        // if (!emailExiste){

        //  await  
              

        // }

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
        }, process.env.TOKEN_SECRET, { expiresIn: 60 * 60 * 24 })

        res.json({
            error: null,
            data: 'exito bienvenido',
            token: token
        })


    },

}