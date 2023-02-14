const {response} = require('express');
const Hospital= require('../models/hospital');

const getHospitales = async (req, res) => {


    const hospitales = await Hospital.find()
                            .populate('usuario','nombre img');

    res.json({
        ok: true,
        hospitales
    })
}

const crearHospitales = async(req, res) => {

    const uid = req.uid;
    const hospital = new Hospital(
        {usuario:uid, ...req.body});

    console.log(uid);

    try {
       const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        })
    }

    
}

const actualizarHospitales = (req, res) => {
    res.json({
        ok: true,
        msg: 'actualizarHospitales'
    })
}

const borrarHospitales = (req, res) => {
    res.json({
        ok: true,
        msg: 'borrarHospitales'
    })
}

module.exports = {
    getHospitales,
    crearHospitales,
    actualizarHospitales,
    borrarHospitales
}