
const {response} = require('express')
const {validationResult} = require('express-validator')
const bcryptSS = require('bcryptjs')
const Usuario = require('../models/usuario')
const { generarJWT } = require('../helpers/jwt')

const getUsuarios = async(req, res)=>{
   const usuarios = await Usuario.find({}, 'nombre email role google');
   
    res.json({
            ok: true,
            usuarios
        }
    )
}
const crearUsuario = async (req, res = response)=>{
    // viene los datos ingresados 
    // console.log(req.body);
    const {email, password}= req.body;

    try {
         const existeEmail = await Usuario.findOne({
            email
         });


         if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
         }
        const usuario = new Usuario(req.body)
        
        // Encriptar contraseña
         const salt = bcryptSS.genSaltSync();
         usuario.password = bcryptSS.hashSync(password, salt);

         // Guaradar
        await usuario.save();

                // generar el TOKEN 
                const token = await generarJWT(usuario.id);


        
        
        res.json({
                ok: true,
                usuario,
                token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado.... revisar logs'
        })
    }
   
}

const actualizarUsuario = async (req, res = response) => {
    
    // todo: validar token y comprobar si el usuario es correcto
    const uid = req.params.id;
   

    try {
        const usuarioDb = await Usuario.findById(uid )

        if (!usuarioDb) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            })
        }
        // Actualizaciones
        // const campos = req.body;
        const {password, google, email,...campos} = req.body;
        

        if (usuarioDb.email !== email) {
            const existeEmail = await Usuario.findOne({email});
            
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }

            campos.email = email;
        }
// colocando esto: const {password, google,...campos} = req.body;
//me evito colocar los deletes  password y google
        // delete campos.password;
        // delete campos.google;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new: true});

        res.json({
            ok: true,
            usuario: usuarioActualizado
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}


const BorrarUsuario = async (req, res = response)=>{
   
    const uid = req.params.id;
    
    try {
        const usuarioDb = await Usuario.findById(uid )

        if (!usuarioDb) {
            return res.status(404).json({
                ok: false,
                msg: 'no existe el usuario con ese id',
                uid
            });
        }
       
        await Usuario.findByIdAndRemove(uid);

        res.json({
            ok: true,
            msg: 'se elimino el usuario'
        });
   
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado.... revisar logs'
        })
    }
   
}


module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    BorrarUsuario
}