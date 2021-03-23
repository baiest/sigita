const express = require('express');
const router = express.Router();

function autenticarBd(data) {
    let respuesta = {};

    if (data.username === 'admin') {
        if (data.password === 'admin') {
            respuesta.session = true;
            respuesta.token = 'tokensito';
        } else {
            respuesta.error = 'Contraseña incorrecta';
        }
    } else {
        respuesta.error = 'Usuario no encontrado';
    }
    return respuesta;
}

function autenticarGoogle() {
    let respuesta = {};
    respuesta.session = true;
    respuesta.token = 'tokensito';
    return respuesta;
}

router.post('/login', (req, res) => {
    console.log('Alguien esta entrando en el login', req.body);
    let data = req.body;
    if (data.googleId) {
        res.send(autenticarGoogle());
    } else {
        res.send(autenticarBd(data));
    }
});

module.exports = router;