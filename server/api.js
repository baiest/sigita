const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

let server = app.listen(PORT, () => console.log(`Servidor iniciado en el puerto ${PORT}`));