// api/todo/:busqueda

const {Router} = require('express')
// const {check} = require('express-validator')
// const {validarCampos} = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt');
const { getTodo, getDocumentosColeccion } = require('../controllers/busqueda');


const router = Router();

// validarJWT
router.get('/:busqueda',
        [
            validarJWT
        ],
         getTodo);


router.get('/coleccion/:tabla/:busqueda',
        [
            validarJWT
        ],
        getDocumentosColeccion);

// router.post('/', 
//     [
//         validarJWT,
//         check('nombre','El nombre del hospital es necesario').not().isEmpty(),
//         validarCampos
//     ],
//     crearHospitales
// );

// router.put('/:id',
// [], 
// actualizarHospitales
// );


// router.delete('/:id', borrarHospitales);

module.exports = router; 