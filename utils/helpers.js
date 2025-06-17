// utils/helpers.js - Funções auxiliares
const crypto = require('crypto');

class Helpers {
  // Gera uma chave aleatória para a sessão
  static generateSessionSecret() {
    return crypto.randomBytes(64).toString('hex');
  }

  // Valida o formato de e-mail
  static isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Remove caracteres perigosos (< e >) de uma string
  static sanitizeInput(input) {
    if (typeof input !== 'string') return input;
    return input.replace(/[<>]/g, '');
  }

  // Formata uma data para o padrão brasileiro (dd/mm/aaaa)
  static formatDate(date) {
    return new Date(date).toLocaleDateString('pt-BR');
  }

  // Faz log de cada requisição com data, rota, IP e navegador
  static logAccess(req) {
    const timestamp = new Date().toISOString();
    const ip = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('User-Agent');

    console.log(`[${timestamp}] ${req.method} ${req.path} - IP: ${ip} - UA: ${userAgent}`);
  }
}

module.exports = Helpers;