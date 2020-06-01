const { Router } = require('express');
const router = Router();
const { register, login, profile, getUsers, getSummoners, updateSummoners } = require('../controllers/user.controller');
const { verifyToken } = require('../helpers/verifyToken');

router.post('/register', register);             // Ruta para el registro
router.post('/login', login);                   // Ruta para el login
router.post('/user/updateSummoners', verifyToken, updateSummoners);


router.get('/profile', verifyToken, profile);       // Devuelve los datos de un perfil de usuario si el token es correcto
router.get('/userlist', getUsers);                  // Devuelve una lista con los usuarios
router.get('/getSummoners', verifyToken, getSummoners);


module.exports = router;