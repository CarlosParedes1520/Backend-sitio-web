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

const actualizarHospitales = async (req, res) => {
   

    const id = req.params.id;
    const uid = req.uid;
    try {
        const hospital = await Hospital.findById(id)

        if (!hospital) {
            return res.status(404).json({
                ok: true,
                msg: 'Hospital no encontrado x id'
            })
        } 

        const cambiosHospital = {
            ...req.body,
            usuario: uid
        }
       
        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital, {new: true});
        res.json({
            ok: true,
            hospital: hospitalActualizado
        }) 
    } catch (error) {
        res.status(500).json({
            ok : false,
            msg: 'Hable con el admin',
          
        })
    }
   
  
}

const borrarHospitales = async (req, res) => {
    
    

    const id = req.params.id;
 
    try {
        const hospital = await Hospital.findById(id)

        if (!hospital) {
            return res.status(404).json({
                ok: true,
                msg: 'Hospital no encontrado x id'
            })
        } 

        await Hospital.findByIdAndDelete(id);
     
        res.json({
            ok: true,
            msg: 'hospital eliminado'
        }) 

    } catch (error) {
        res.status(500).json({
            ok : false,
            msg: 'Hable con el admin',
          
        })
    }
   
    
    
    
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