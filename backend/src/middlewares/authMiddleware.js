const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET; // ou o que usares

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  //console.log('🔎 Token recebido no header:', token);

  if (!token) {
    console.error('❌ Nenhum token enviado.');
    return res.status(401).json({ mensagem: 'Acesso negado. Token não fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    //console.log('✅ Token decodificado:', decoded);

    req.user = decoded; // Guardar o utilizador no req.user para os controllers

    next();
  } catch (error) {
    console.error('❌ Token inválido:', error.message);
    return res.status(401).json({ mensagem: 'Token inválido.' });
  }
};

const verificarAdmin = (req, res, next) => {
  if (req.user && req.user.nivelAcesso > 1) {
    next();
  } else {
    console.warn('🔒 Acesso negado: utilizador sem permissões de administrador.');
    return res.status(403).json({ mensagem: 'Acesso negado: apenas administradores podem aceder.' });
  }
};

module.exports = {
  authMiddleware,
  verificarAdmin,
};
