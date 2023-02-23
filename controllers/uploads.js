const path = require('path');
const fs = require('fs');
const {response} = require("express");
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require("../helpers/actualizar-imagen");



const fileUpload = (req, res = response ) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    // validar tipo
    const tiposValidos = ['hospitales', 'medicos', 'usuarios']
    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es un medico, usuario u hospital'
        });
    }


    //  validar q exiata    UN rchivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningun archivo'
        });
    }

    // Procesar la imagen
    const file = req.files.imagen;
    const nombreCortado = file.name.split('.');//cortar extencion
    const extensionArchivo = nombreCortado[nombreCortado.length-1];
    
    // validar extension
    const extensionesValidada = ['png','jpg','jpeg', 'gif'];
    
    if (!extensionesValidada.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extencion permitida'
        });
    }

    // Generar el nombre del archivo

    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`
    // uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'


    // path para guardar la imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    // mover la imagen Use the mv() method to place the file somewhere on your server
    file.mv(path, (err) => {
        if (err){
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }
        // actualizar Base de datos
        actualizarImagen(tipo, id, nombreArchivo);

        res.json({
            ok: true,
            msg: 'Archivo subido',
            nombreArchivo
        })
    });

 
  
}


const retornaImagen = (req, res = response) =>{

    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join(__dirname,`../uploads/${tipo}/${foto}`);


    // imagen x defecto
    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    }else {
        const pathImg = path.join(__dirname,`../uploads/img-defecto.png`);
        res.sendFile(pathImg);
    }
}

module.exports = {
    fileUpload,
    retornaImagen
}
