const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send({
        msj: "Hola desde el index",
    });
});

module.exports = router;