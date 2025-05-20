const express = require('express');
const { criarCategoria, listarCategorias, apagarCategoria, atualizarCategoria, obterCategoriaPorId, arquivar, desarquivar } = require('../controllers/categoriaController');
const authMiddleware = require('../middlewares/authMiddleware.js');
const router = express.Router();


router.post('/criarcategoria', authMiddleware, criarCategoria);
router.get('/categoria', authMiddleware, listarCategorias);
router.get('/categoriaID/:id', authMiddleware, obterCategoriaPorId);
router.put('/categoriaUP/:id', authMiddleware, atualizarCategoria);
router.delete('/categoriaDL/:id', authMiddleware, apagarCategoria);
router.patch('/arquivar/:id', authMiddleware, arquivar);
router.patch('/desarquivar/:id', authMiddleware, desarquivar);



module.exports = router;