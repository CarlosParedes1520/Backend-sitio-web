const {response } = require('express');
const Usuario = require('../models/usuario');
const bcryptSS = require('bcryptjs') 
const {generarJWT} = require('../helpers/jwt') 

const login = async(req,res= response) => {

    const {email, password} = req.body;
    try {


        // verificar email
        const usuarioDB = await Usuario.findOne({email});

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Contraseña no valida'
            })
        }

        // Verificar contraseña
console.log(password); 
console.log(usuarioDB.password); 
        const validPassword = bcryptSS.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no valida'
            });
        }

        // generar el TOKEN 
        const token = await generarJWT(usuarioDB.id);
        

        res.json({
            ok: true,
            token
        })
     
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'hable con el admin'
        })
    }
}

module.exports = {
    login
}