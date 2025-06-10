// routes/auth.js - Rotas de autenticação
const express = require('express');
const passport = require('passport');
const User = require('../models/user');
const router = express.Router();

// Página de login
router.get('/login', (req, res) => {
    const message = req.query.message || '';
    res.render('login', { message });
});

// Página de registro
router.get('/register', (req, res) => {
    const message = req.query.message || '';
    res.render('register', { message });
});

// Processar login
router.post('/login', 
    passport.authenticate('local', {
    failureRedirect: '/auth/login?message=Credenciais inválidas'
    }),
    (req, res) => {
        console.log('Login realizado com sucesso');
        res.redirect('/dashboard');
    }
);

// Processar registro
router.post('/register', (req, res) => {
  const { username, password } = req.body;
  
  // Verificar se o usuário já existe
  const existingUser = User.findByUsername(username);
  if (existingUser) {
    return res.render('register', { message: 'Usuário já existe' });
  }
  
  // Criar novo usuário
  try {
    User.create({ username, password });
    console.log('Novo usuário registrado:', username);
    res.redirect('/auth/login?message=Usuário registrado com sucesso! Faça login.');
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.render('register', { message: 'Erro ao registrar usuário' });
  }
});

// Logout
router.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error('Erro no logout:', err);
      return res.redirect('/dashboard');
    }
    console.log('Logout realizado com sucesso');
    res.redirect('/?message=Logout realizado com sucesso');
  });
});

module.exports = router;