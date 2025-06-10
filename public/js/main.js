// public/js/main.js - JavaScript do frontend
document.addEventListener('DOMContentLoaded', function() {
  // Validação simples de formulários
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      const inputs = form.querySelectorAll('input[required]');
      let isValid = true;
      
      inputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.style.borderColor = '#dc3545';
        } else {
          input.style.borderColor = '#ddd';
        }
      });
      
      if (!isValid) {
        e.preventDefault();
        alert('Por favor, preencha todos os campos obrigatórios.');
      }
    });
  });
  
  // Limpar mensagens após 5 segundos
  const messages = document.querySelectorAll('.message');
  messages.forEach(message => {
    setTimeout(() => {
      message.style.opacity = '0';
      setTimeout(() => {
        message.remove();
      }, 300);
    }, 5000);
  });
});