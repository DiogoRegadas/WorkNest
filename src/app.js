// backend/src/app.js
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
require('/config/dotenv');
const connectDB = require('/config/db');

// Conectar à base de dados
connectDB();

const app = express();

// Middlewares
app.use(express.json()); // Permite JSON no corpo das requisições
app.use(cors()); // Ativa o CORS para permitir comunicações entre frontend e backend

// Rotas
app.use('/api/users', userRoutes);

// Rota padrão
app.get('/', (req, res) => {
    res.send('WorkNest API está a funcionar!');
});

module.exports = app;