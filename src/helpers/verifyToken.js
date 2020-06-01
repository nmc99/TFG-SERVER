const jwt = require('jsonwebtoken');
verify = {};

verify.verifyToken = function (req, res, next) {
    if (!req.headers.authorization) {       // Si en el header no viene con Authorization devuelve error
        return res.status(401).json({ "statusCode": 401, "message": "No esta autorizado" });
    }
    const token = req.headers.authorization.split(' ')[1];  // Recoge el token separandolo de 'Bearer'
    if (token === 'null') {     // Si el token esta vacio devuelve error
        return res.status(401).json({ "statusCode": 401, "message": "No esta autorizado" });
    }

    const payload = jwt.verify(token, process.env.SECRETKEY)  // Verifica si el token es correcto
    req.userId = payload._id;   // Asigna el valor del token verificado al userId del req que recoge la siguiente funcion
    next();
}

module.exports = verify;
