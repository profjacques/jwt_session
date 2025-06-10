// config/auth.js - Configuração do Passport
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');