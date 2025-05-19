// src/socketServer.js

let io;

function setupSocket(server) {
  const socketio = require('socket.io');
  io = socketio(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log('🟢 Utilizador conectado ao WebSocket');

    // Entrar na sala de projeto
    socket.on('entrarProjeto', (projectId) => {
      socket.join(`projeto:${projectId}`);
      console.log(`👤 Entrou na sala do projeto ${projectId}`);
    });

    // Sair da sala (opcional)
    socket.on('sairProjeto', (projectId) => {
      socket.leave(`projeto:${projectId}`);
      console.log(`👤 Saiu da sala do projeto ${projectId}`);
    });

    socket.on('disconnect', () => {
      console.log('🔴 Utilizador desconectado');
    });
  });
}

function getIO() {
  if (!io) {
    throw new Error('❌ Socket.IO não foi inicializado!');
  }
  return io;
}

module.exports = { setupSocket, getIO };
