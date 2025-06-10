// routes/index.js - Rotas públicas
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const message = req.query.message || '';
    res.render('index', { message });
});

module.exports = router;