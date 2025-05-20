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

  const usersOnlinePorProjeto = {}; // { "projeto:abc123": Set(userId, userId...) }

    io.on('connection', (socket) => {
      console.log('🟢 Utilizador conectado ao WebSocket');

      socket.on('entrarProjeto', ({ projectId, userId }) => {
        const sala = `projeto:${projectId}`;
        socket.join(sala);
        socket.projectId = projectId;
        socket.userId = userId;

        if (!usersOnlinePorProjeto[sala]) {
          usersOnlinePorProjeto[sala] = new Set();
        }
        usersOnlinePorProjeto[sala].add(userId);

        console.log(`👤 ${userId} entrou na sala ${sala}`);
        io.to(sala).emit('projectOnlineUsers', Array.from(usersOnlinePorProjeto[sala]));
      });

      socket.on('sairProjeto', ({ projectId, userId }) => {
        const sala = `projeto:${projectId}`;
        socket.leave(sala);
        usersOnlinePorProjeto[sala]?.delete(userId);
        console.log(`👤 ${userId} saiu da sala ${sala}`);
        io.to(sala).emit('projectOnlineUsers', Array.from(usersOnlinePorProjeto[sala] || []));
      });

      socket.on('disconnect', () => {
        const { projectId, userId } = socket;
        const sala = `projeto:${projectId}`;
        if (projectId && userId && usersOnlinePorProjeto[sala]) {
          usersOnlinePorProjeto[sala].delete(userId);
          console.log(`🔴 ${userId} desconectado da sala ${sala}`);
          io.to(sala).emit('projectOnlineUsers', Array.from(usersOnlinePorProjeto[sala]));
        }
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
