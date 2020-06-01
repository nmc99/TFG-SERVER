require('dotenv').config();         // Modulo que gestiona variables de entorno para mayor seguridad {dev}
const app = require("./server");    // Importamos la configuracion del servidor
require('./database');              // Conexion a la base de datos


/* INICIO DEL SERVIDOR */
app.listen(app.get("port"), () => {
    console.log(`Servidor escuchando en el puerto ${app.get("port")}`);
})
