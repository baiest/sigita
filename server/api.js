const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Se agrega el nombre del archivo que contiene la ruta
let rutas = [
    'index',
]

// se antepone la ruta /api y se recorre el arreglo rutas para
// traer las funciones respectivas
app.use('/api', rutas.map((r) => require(`./routes/${r}`)));

let server = app.listen(PORT, () => console.log(`Servidor iniciado en el puerto ${PORT}`));