// utils/helpers.js - Funções auxiliares
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const crypto = require('crypto');

class Helpers {
  static generateSessionSecret() {
    return crypto.randomBytes(64).toString('hex');
  }
  
  static isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  static sanitizeInput(input) {
    if (typeof input !== 'string') return input;
    return input.replace(/[<>]/g, '');
  }
  
  static formatDate(date) {
    return new Date(date).toLocaleDateString('pt-BR');
  }
  
  static logAccess(req) {
    const timestamp = new Date().toISOString();
    const ip = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('User-Agent');
    
    console.log(`[${timestamp}] ${req.method} ${req.path} - IP: ${ip} - UA: ${userAgent}`);
  }
}

module.exports = Helpers;

// Configuração da LocalStrategy
passport.use(new LocalStrategy(
  (username, password, done) => {
    console.log(`Tentativa de login para: ${username}`);
    
    // Busca o usuário no "banco de dados"
    const user = User.findByUsername(username);
    
    if (!user) {
      console.log('Usuário não encontrado');
      return done(null, false, { message: 'Usuário não encontrado' });
    }
    
    // Compara a senha fornecida com o hash armazenado
    const isValidPassword = User.validatePassword(password, user.password);
    
    if (!isValidPassword) {
      console.log('Senha incorreta');
      return done(null, false, { message: 'Senha incorreta' });
    }
    
    console.log('Login bem-sucedido');
    return done(null, user);
  }
));

// Serialização: define qual dado do usuário será armazenado na sessão
passport.serializeUser((user, done) => {
  console.log('Serializando usuário:', user.id);
  done(null, user.id);
});

// Desserialização: recupera o objeto completo do usuário usando o ID da sessão
passport.deserializeUser((id, done) => {
  console.log('Desserializando usuário ID:', id);
  const user = User.findById(id);
  if (user) {
    done(null, user);
  } else {
    done(new Error('Usuário não encontrado'));
  }
});

module.exports = passport;