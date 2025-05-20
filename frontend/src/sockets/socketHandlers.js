export function configurarSocketEventos(socket, projetoId, setProjeto, setOnlineUsers) {
  if (!socket || !projetoId || !setProjeto) return;

  const userData = JSON.parse(localStorage.getItem('utilizador'));
  const userId = userData?._id || userData?.id;

  if (!userId) {
    console.warn('⚠️ Utilizador não encontrado no localStorage');
    return;
  }

  console.log('🎯 Enviar para sala:', { projectId: projetoId, userId });

  // ⚠️ Remover listeners antigos
  socket.off('projetoAtualizado');
  socket.off('projectOnlineUsers');

  // 👉 Entra na sala do projeto com userId
  socket.emit('entrarProjeto', { projectId: projetoId, userId });

  // 🔄 Quando o projeto é atualizado
  socket.on('projetoAtualizado', (novoProjeto) => {
    console.log('📡 Projeto atualizado via WebSocket:', novoProjeto);
    setProjeto(novoProjeto);
  });

  // 🟢 Atualização da lista de utilizadores online no projeto
  socket.on('projectOnlineUsers', (lista) => {
    console.log('🟢 Lista online recebida:', lista);
    if (setOnlineUsers) setOnlineUsers(lista);
  });

  socket.on('connect_error', (err) => {
    console.error('🚫 Erro ao conectar ao socket:', err.message);
  });

  socket.on('disconnect', (reason) => {
    console.warn('🔌 Desconectado do socket:', reason);
  });
}
