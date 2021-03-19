const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send({
        msj: "Hola index"
    });
});

module.exports = router;