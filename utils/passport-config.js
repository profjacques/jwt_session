// utils/passport-config.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

// Configuração da estratégia local
passport.use(new LocalStrategy(
  (username, password, done) => {
    console.log(`Tentativa de login: ${username}`);

    const user = User.findByUsername(username);
    if (!user) {
      console.log('Usuário não encontrado');
      return done(null, false, { message: 'Usuário não encontrado' });
    }

    const isValid = User.validatePassword(password, user.password);
    if (!isValid) {
      console.log('Senha incorreta');
      return done(null, false, { message: 'Senha incorreta' });
    }

    console.log('Login bem-sucedido');
    return done(null, user);
  }
));

// Serializa apenas o ID do usuário
passport.serializeUser((user, done) => {
  console.log('Serializando usuário:', user.id);
  done(null, user.id);
});

// Usa o ID serializado para buscar o usuário novamente
passport.deserializeUser((id, done) => {
  const user = User.findById(id);
  if (user) {
    done(null, user);
  } else {
    done(new Error('Usuário não encontrado'));
  }
});
