const {response } = require('express');
const Usuario = require('../models/usuario');
const bcryptSS = require('bcryptjs') 
const {generarJWT} = require('../helpers/jwt'); 
const { googleVerify } = require('../helpers/google-verified');

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


const googleSingIn = async(req,res= response) => {
    
    
    try {
        const {email, name, picture} = await googleVerify(req.body.token);
        
        const usuarioDB = await Usuario.findOne({email});
        let usuario;

        if (!usuarioDB) {
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            })
        }else{
            usuario = usuarioDB;
            usuario.google = true;
            // usuario.password = '@@'    
        }

        // Guardar el token 
        await usuario.save();

        // generar el token jwt
        const token = await generarJWT(usuario.id);
        

        res.json({
            ok: true,
            email, name, picture,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Token de google no es correcto'
        })
    }
    
}

const renewToken = async (req, res = response) => {
    
    const uid = req.uid;
    // generar el token jwt
    const token = await generarJWT(uid);
        

    res.json({
        ok: true,
        token
    })
}


module.exports = {
    login,
    googleSingIn,
    renewToken
}