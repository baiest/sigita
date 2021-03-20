const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
    console.log('Alguien esta entrando en el login', req.body.user);
    res.send({
        user: true
    });
});

module.exports = router;