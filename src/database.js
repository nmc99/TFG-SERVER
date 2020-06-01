const mongoose = require("mongoose");
const { MONGODB_HOST, MONGODB_DATABASE } = process.env;

const MONGODB_URI = `mongodb://${MONGODB_HOST}/${MONGODB_DATABASE}`;

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,      // Para evitar fallos (deprecated)
    useUnifiedTopology: true,   // Para evitar fallos (deprecated)
    useCreateIndex: true,
  })
  .then((db) => console.log("Conectado a la base de datos"))    // Recibe la conexion y se conecta
  .catch((err) => console.log(err));                            // Lanza error si no se puede establecer conexion
