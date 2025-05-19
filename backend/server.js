require('dotenv').config();
const http = require('http');
const app = require('./src/app');
const { setupSocket } = require('./src/socketServer');

const PORT = process.env.PORT || 3000;

// Criar servidor HTTP com express
const server = http.createServer(app);

// Iniciar WebSocket
setupSocket(server);

// Arrancar servidor
server.listen(PORT, () => {
  console.log(`🚀 Servidor a correr na porta ${PORT}`);
});
