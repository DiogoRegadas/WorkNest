// backend/src/app.js
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();
const connectDB = require('./config/db');
const requestLogger  = require('./middlewares/requestLogger');

// Conectar à base de dados
connectDB();

const app = express();

// Middlewares
app.use(express.json()); // Permite JSON no corpo das requisições
app.use(cors()); // Ativa o CORS para permitir comunicações entre frontend e backend
app.use(cors({
    origin: 'http://localhost:3001', // <-- coloca a porta certa do frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }));
app.use(requestLogger); // Regista todas as requisições

// Rotas
app.use('/api/users', userRoutes);

// Rota padrão
app.get('/', (req, res) => {
    res.send('WorkNest API está a funcionar!');
});

module.exports = app;