// backend/src/controllers/anexoController.js
const anexoService = require('../services/anexoService');

exports.downloadAnexo = async (req, res) => {
  try {
    const { nome } = req.params;
    const { file, readstream } = await anexoService.obterAnexoPorNome(nome);

    res.set('Content-Type', file.contentType);
    res.set('Content-Disposition', `attachment; filename="${file.filename}"`);

    readstream.pipe(res);
  } catch (error) {
    console.error("❌ Erro ao fazer download:", error);
    res.status(404).json({ sucesso: false, mensagem: 'Ficheiro não encontrado.' });
  }
};
