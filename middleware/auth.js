// middleware/auth.js - Middleware de autenticação
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        console.log('Usuário autenticado:', req.user.username);
        return next();
    }

    console.log('Usuário não autenticado, redirecionando para login');
    res.redirect('/login?message=Você precisa fazer login para acessar esta página');
}

module.exports = { ensureAuthenticated };