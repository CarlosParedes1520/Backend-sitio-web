const {Schema, model} = require('mongoose');

const MedicoSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    
    img: {
        type: String,
        
    },
    
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    
    hospital: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Hospital'
    }
});

MedicoSchema.method('toJSON', function () {
   // renombrar en postman o en fronend no modifica la base de datos
    const {__v, ...Object} = this.toObject();
    // Object.id = _id;
    return Object
});


module.exports = model('Medico', MedicoSchema);