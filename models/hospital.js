const {Schema, model} = require('mongoose');

const HospitalSchema = Schema({
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
    }
});

HospitalSchema.method('toJSON', function () {
   // renombrar en postman o en fronend no modifica la base de datos
    const {__v, ...Object} = this.toObject();
    // Object.id = _id;
    return Object
}, {collection: 'hospitales'}); //{collection: 'hospitales'} nombre personalizado en la base de datos


module.exports = model('Hospital', HospitalSchema);