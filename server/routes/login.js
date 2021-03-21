const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
    console.log('Alguien esta entrando en el login', req.body);
    let data = req.body;
    let respuesta = {};
    let status = 200
    if (data.username === 'admin') {
        if (data.password === 'admin') {
            respuesta.session = true;
        } else {
            respuesta.error = 'Contraseña incorrecta'
        }
    } else {
        respuesta.error = 'Usuario no encontrado';
    }
    console.log(respuesta)
    res.send(respuesta);
});

module.exports = router;