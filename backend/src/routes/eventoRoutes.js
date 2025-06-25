const express = require('express');
const router = express.Router();
const EventoController = require('../controllers/eventoController');

// Apenas importar a rota GET existente do controller
router.get('/projeto/:idProjeto', EventoController);

// (Opcional: se quiseres listar todos os eventos de todos os projetos)
router.get('/', async (req, res) => {
  try {
    const resultado = await require('../services/eventoServices').listarTodosEventos();
    res.status(resultado.status).json(resultado.resposta);
  } catch (erro) {
    console.error('Erro ao listar todos os eventos:', erro);
    res.status(500).json({ sucesso: false, mensagem: 'Erro interno.' });
  }
});

module.exports = router;
