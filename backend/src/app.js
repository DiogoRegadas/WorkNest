// backend/src/app.js
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes'); // Exemplo de rota para projetos
const pedidoRoutes = require('./routes/pedidoRoutes');
const topicoRoutes = require('./routes/topicRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const authRoutes = require('./routes/authRoutes');
const mensagemRoutes = require('./routes/mensagemRoutes');
const tarefaRoutes = require('./routes/tarefaRoutes'); // Importa as rotas de tarefas
const anexoRoutes = require('./routes/anexoRoutes'); // Importa as rotas de anexos
const avaliacaoRoutes = require('./routes/avaliacaoRoutes'); // Importa as rotas de avaliações
const logRoutes = require('./routes/logRoutes');

require('dotenv').config();
const { connectDB } = require('./config/db');
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
app.use('/api/projects', projectRoutes); // Exemplo de rota para projetos
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/topicos', topicoRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/mensagens', mensagemRoutes);
app.use('/api/tarefas', tarefaRoutes); // Rota para tarefas
app.use('/api/anexos', anexoRoutes); // Rota para anexos
app.use('/api/avaliacoes', avaliacaoRoutes); // Rota para avaliações
app.use('/api/logs', logRoutes); // Rota para logs
// Rota padrão
app.get('/', (req, res) => {
    res.send('WorkNest API está a funcionar!');
});

module.exports = app;