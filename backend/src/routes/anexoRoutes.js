// backend/src/routes/anexoRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware');
const { downloadAnexo } = require('../controllers/anexoController');
const {authMiddleware} = require('../middlewares/authMiddleware');

// Upload de anexo
router.post('/upload', authMiddleware, upload.single('ficheiro'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ sucesso: false, mensagem: 'Nenhum ficheiro enviado.' });
  }
  res.status(200).json({ sucesso: true, nomeFicheiro: req.file.filename });
});

// Download de anexo
router.get('/download/:nome', authMiddleware, downloadAnexo);

module.exports = router;
