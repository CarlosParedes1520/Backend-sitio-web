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


const actualizarMedicos = async (req, res) => {
    const id = req.params.id;
    const uid = req.uid;
    const idHospital = req.hospital;
    
    try {
        const medico = await Medicos.findById(id)

        if (!medico) {
            return res.status(404).json({
                ok: true,
                msg: 'Medico no encontrado x id'
            })
        } 
        const cambiosMedico = {
            ...req.body,
            usuario: uid,
            hospital: idHospital
        }
        const medicoActualizado = await Medicos.findByIdAndUpdate(id, cambiosMedico, {new: true});
        res.json({
            ok: true,
            hospital: medicoActualizado
        }) 
    } catch (error) {
        res.status(500).json({
            ok : false,
            msg: 'Hable con el admin',
          
        })
    }
}

const borrarMedicos = async(req, res) => {
    const id = req.params.id;
 
    try {
        const medico = await Medicos.findById(id)

        if (!medico) {
            return res.status(404).json({
                ok: true,
                msg: 'medico no encontrado x id'
            })
        } 

        await Medicos.findByIdAndDelete(id);
     
        res.json({
            ok: true,
            msg: 'medico eliminado'
        }) 

    } catch (error) {
        res.status(500).json({
            ok : false,
            msg: 'Hable con el admin',
          
        })
    }
   
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