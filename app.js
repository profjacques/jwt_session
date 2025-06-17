// app.js - Aplicação principal
const express = require('express');
const session = require('express-session');
const path = require('path');

// Configuração do Passport separada
require('./utils/passport-config');
const passport = require('passport');

// Importar rotas
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');

// Importar funções auxiliares
const Helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do EJS como template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts); // middleware
app.set('layout', 'layout'); // nome do arquivo de layout padrão (views/layout.ejs)

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middlewares básicos
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Middleware de log de acesso
app.use((req, res, next) => {
  if (typeof Helpers.logAccess === 'function') {
    Helpers.logAccess(req);
  }
  next();
});

// Configuração da sessão com segurança
app.use(session({
  secret: process.env.SESSION_SECRET || 'meu-secret-super-forte-e-complexo-para-producao-use-variavel-ambiente',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // true apenas com HTTPS
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24h
    sameSite: 'strict'
  }
}));

// Inicializa Passport
app.use(passport.initialize());
app.use(passport.session());

// Disponibiliza dados do usuário logado nas views
app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
});

// Usar rotas
app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/', protectedRoutes);

// Middleware para erros internos
app.use((err, req, res, next) => {
  console.error('Erro na aplicação:', err);
  res.status(500).render('error', { error: 'Erro interno do servidor' });
});

// Middleware para páginas não encontradas
app.use((req, res) => {
  res.status(404).render('error', { error: 'Página não encontrada' });
});

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Acesse: http://localhost:${PORT}`);
  console.log('Usuários de teste:');
  console.log('- admin / password123');
  console.log('- user / mypassword');
});