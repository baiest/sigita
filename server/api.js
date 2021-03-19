const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const index = require('./routes/index');

app.use('/api', index);

let server = app.listen(PORT, () => console.log(`Servidor iniciado en el puerto ${PORT}`));