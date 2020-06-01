const path = require("path");           // Modulo para gestionar los directorios {prod}
const morgan = require("morgan");       // Muestra las peticiones en formato codigo - error {dev}
const express = require("express");     
const app = express();
const cors = require("cors");           // Modulo para gestionar los errores causados por CORS {prod}


/* CONFIGURACION DEL SERVIDOR */
app.set("port", process.env.PORT || 3000);

/* MIDDLEWARES */
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));     // Inicializa morgan
app.use(cors());            // Inicializa cors
app.use(express.json());    // Middleware para poder enviar y procesar formato JSON

/* VARIABLES GLOBALES DEL SERVIDOR */

/* ROUTES */
const userRouter = require("./routes/user.routes");             // Router para las rutas relacionadas con el usuario
const summonerRouter = require("./routes/summoner.routes");     // Router para las rutas de peticion de datos del summoner {lol}

app.use("/user", userRouter);
app.use("/summoner", summonerRouter);

/* ARCHIVOS ESTATICOS */
app.use(express.static(path.join(__dirname, "public")));        // Ruta de los archivos publicos (JSON, imagenes)

module.exports = app;
