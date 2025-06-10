// routes/protected.js - Rotas protegidas
const express = require('express');
const { ensureAuthenticated } = require('../middleware/auth');
const router = express.Router();

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render('dashboard', { user: req.user });
});

// Perfil
router.get('/profile', ensureAuthenticated, (req, res) => {
    res.render('profile', { user: req.user });
});

module.exports = router;