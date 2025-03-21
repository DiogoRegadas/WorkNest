// backend/src/routes/userRoutes.js
const express = require('express');
const { registerUser, getUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');
const router = express.Router();

console.log("Register User Function:", registerUser);
console.log("getUsers Function:", getUsers);
console.log("getUserById Function:", getUserById);
console.log("updateUser Function:", updateUser);
console.log("deleteUser Function:", deleteUser);
// Rota para registar um novo utilizador
router.post('/register', registerUser);

router.get('/test', (req, res) => {
    res.send('Rota de teste OK!');
});

// Rota para obter todos os utilizadores
router.get('/', getUsers);

// Rota para obter um utilizador pelo ID
router.get('/:id', getUserById);

// Rota para atualizar um utilizador
router.put('/:id', updateUser);

// Rota para eliminar um utilizador
router.delete('/:id', deleteUser);

module.exports = router;

