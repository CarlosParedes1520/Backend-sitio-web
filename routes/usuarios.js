//  Ruta: /api/usuarios

const {Router} = require('express')
const {check} = require('express-validator')
const {validarCampos} = require('../middlewares/validar-campos')
const {getUsuarios, crearUsuario, actualizarUsuario, BorrarUsuario} = require('../controllers/usuarios');
const { validarJWT, validarAdmin_role, validarAdmin_role_0_MismoUusario } = require('../middlewares/validar-jwt');

const router = Router();


router.get('/', validarJWT, getUsuarios);
router.post('/', 
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos,
    
    ],
    crearUsuario
);

router.put('/:id',[
    validarJWT,
    validarAdmin_role_0_MismoUusario,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('role', 'El rol es obligatorio').not().isEmpty(),
        validarCampos,
], actualizarUsuario);


router.delete('/:id',
    [validarJWT, validarAdmin_role], 
    BorrarUsuario
);

module.exports = router; 