// app.js - Aplicação principal (ATUALIZADO)
const express = require('express');
const session = require('express-session');
const passport = require('./config/auth');
const path = require('path');

// Importar rotas
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');

// Importar utilitários
const Helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do EJS como template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middlewares básicos
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Middleware de log de acesso
app.use((req, res, next) => {
  Helpers.logAccess(req);
  next();
});

// Configuração do express-session com práticas de segurança
app.use(session({
  secret: process.env.SESSION_SECRET || 'meu-secret-super-forte-e-complexo-para-producao-use-variavel-ambiente',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // true em produção com HTTPS
    httpOnly: true, // Previne acesso via JavaScript (XSS)
    maxAge: 24 * 60 * 60 * 1000, // 24 horas
    sameSite: 'strict' // Proteção contra CSRF
  }
}));

// Inicialização do Passport
app.use(passport.initialize());
app.use(passport.session());

// Middleware para disponibilizar informações do usuário em todas as views
app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
});

// Usar as rotas
app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/', protectedRoutes);

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error('Erro na aplicação:', err);
  res.status(500).render('error', { error: 'Erro interno do servidor' });
});

// Middleware para rotas não encontradas
app.use((req, res) => {
  res.status(404).render('error', { error: 'Página não encontrada' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Acesse: http://localhost:${PORT}`);
  console.log('Usuários de teste:');
  console.log('- admin / password123');
  console.log('- user / mypassword');
});