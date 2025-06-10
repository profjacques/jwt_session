// models/user.js - Modelo de usuário
const bcrypt = require('bcryptjs');

// Simulação de banco de dados em memória (em produção, use um banco real)
const users = [
  {
    id: 1,
    username: 'admin',
    // Senha: 'password123' (hash gerado com bcrypt)
    password: '$2a$10$8K1p/a0dURXAm9/ytlCO1uy7Q/7T3V9FqSGMN3k2hQoYJlQ9Vixdm'
  },
  {
    id: 2,
    username: 'user',
    // Senha: 'mypassword' (hash gerado com bcrypt)
    password: '$2a$10$Jm3ZQ2r7aHwK5fPgXmT8RO7GvYoNkE3bXrJpQwElKdMzN8vP1LqSa'
  }
];

class User {
  static findByUsername(username) {
    return users.find(u => u.username === username);
  }
  
  static findById(id) {
    return users.find(u => u.id === id);
  }
  
  static create(userData) {
    const newUser = {
      id: users.length + 1,
      username: userData.username,
      password: bcrypt.hashSync(userData.password, 10)
    };
    
    users.push(newUser);
    return newUser;
  }
  
  static validatePassword(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
  }
  
  static getAll() {
    return users;
  }
}

module.exports = User;