// controllers/EventoController.js
const express = require('express');
const router = express.Router();
const EventoService = require('../services/eventoServices');

router.post('/', async (req, res) => {
  try {
    const resultado = await EventoService.criarEvento(req.body);
    res.status(resultado.status).json(resultado.resposta);
  } catch (erro) {
    console.error('Erro no controller (criar evento):', erro);
    res.status(500).json({ sucesso: false, mensagem: 'Erro interno.' });
  }
});

router.get('/projeto/:idProjeto', async (req, res) => {
  try {
    const resultado = await EventoService.listarEventosPorProjeto(req.params.idProjeto);
    res.status(resultado.status).json(resultado.resposta);
  } catch (erro) {
    console.error('Erro no controller (listar eventos):', erro);
    res.status(500).json({ sucesso: false, mensagem: 'Erro interno.' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const resultado = await EventoService.apagarEvento(req.params.id);
    res.status(resultado.status).json(resultado.resposta);
  } catch (erro) {
    console.error('Erro no controller (apagar evento):', erro);
    res.status(500).json({ sucesso: false, mensagem: 'Erro interno.' });
  }
});

module.exports = router;
