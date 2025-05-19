const jwt = require('jsonwebtoken');

exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(400).json({ sucesso: false, mensagem: 'Refresh token em falta.' });

  try {
    const payload = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
    const novoToken = jwt.sign(
      { id: payload.id, email: payload.email },
      process.env.JWT_SECRET,
      { expiresIn: '3h' }
    );

    return res.status(200).json({ sucesso: true, token: novoToken });
  } catch (err) {
    return res.status(401).json({ sucesso: false, mensagem: 'Refresh token inválido.' });
  }
};
