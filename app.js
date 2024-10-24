const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const { conectarBD, sequelize } = require("./config/db");
const productoRutas = require("./routes/productoRutas");
const categoriasRutas = require("./routes/categoriasRutas");
const usuarioRutas = require("./routes/usuarioRuta");
const authRutas = require('./routes/authRutas'); // Asegúrate de que el path sea correcto

dotenv.config();

const app = express();

// Configuración de vistas
app.set('view engine', 'pug');
app.set('views', './views');

// Middleware para manejar rutas
app.use('/auth', authRutas);

// Conectar a la base de datos
conectarBD();

// Sincronizar modelos
sequelize.sync().then(() => {
  console.log("Modelos sincronizados con la base de datos.");
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Sirviendo archivos estáticos desde la carpeta 'public'
app.use(express.static("public"));

// Configurar Pug como motor de vistas
app.set("view engine", "pug");
app.set("views", "./views");

// Rutas
app.get("/", (req, res) => {
  res.render("index", { titulo: "Bienvenido a la Tienda" });
});
app.use('/productos', productoRutas);
app.use('/categorias', categoriasRutas);
app.use('/usuarios', usuarioRutas);

app.use('/json', require('./routes/productoRutas'));

const PUERTO = process.env.PUERTO || 3000;
app.listen(PUERTO, () => {
  console.log(`Servidor ejecutándose en el puerto ${PUERTO}`);
});
