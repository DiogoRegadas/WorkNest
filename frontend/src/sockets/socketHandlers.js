// src/sockets/socketHandlers.js

import { obterProjetoCompleto } from '../services/api';

export function configurarSocketEventos(socket, projetoId, setProjeto) {
  if (!socket || !projetoId || !setProjeto) return;

  // ⚠️ Limpar qualquer listener anterior
  socket.off('projetoAtualizado');

  // 👉 Entra na sala do projeto
  socket.emit('entrarProjeto', projetoId);
  console.log(`🧩 Entrou na sala do projeto: ${projetoId}`);

  // 👉 Evento emitido pelo backend quando o projeto é atualizado
  socket.on('projetoAtualizado', (novoProjeto) => {
    console.log('📡 Projeto atualizado via WebSocket:', novoProjeto);
    setProjeto(novoProjeto);
  });

  // Eventos auxiliares
  socket.on('connect_error', (err) => {
    console.error('🚫 Erro ao conectar ao socket:', err.message);
  });

  socket.on('disconnect', (reason) => {
    console.warn('🔌 Desconectado do socket:', reason);
    
  });
}
