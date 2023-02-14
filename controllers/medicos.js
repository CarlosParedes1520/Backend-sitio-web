const {response} = require('express');
const Medicos = require('../models/medico');

const getMedicos= async(req, res) => {
    const medicos = await Medicos.find()
                            .populate('usuario','nombre img')
                            .populate('hospital','nombre');
    res.json({
        ok: true,
        medicos
    })
}

const crearMedicos = async(req, res) => {
    
    const uid = req.uid;
    const medico = new Medicos(
        // , hospital:uid 
        {usuario:uid, ...req.body});
    
        console.log(uid);

        try {
           const medicoDB = await medico.save();
    
            res.json({
                ok: true,
                medico: medicoDB
            });
    
        } catch (error) {
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Hable con el admin'
            })
        }
}


const actualizarMedicos= (req, res) => {
    res.json({
        ok: true,
        msg: 'actualizarMedicos'
    })
}

const borrarMedicos = (req, res) => {
    res.json({
        ok: true,
        msg: 'borrarMedicos'
    })
}

module.exports = {
    getMedicos,
    crearMedicos,
    actualizarMedicos,
    borrarMedicos
}