// src/pages/InsideProjectPage.jsx

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../components/InsideProjectPage/InsideProjectPage.module.css';

import InsideNavbar from '../components/InsideProjectPage/Navbar/InsideNavbar';
import InsideSidebar from '../components/InsideProjectPage/Sidebar/InsideSidebar';
import LoadingScreen from '../components/InsideProjectPage/LoadingScreen/LoadingScreen';

import { obterProjetoCompleto } from '../services/api';

import socket from '../sockets/socket';
import { configurarSocketEventos } from '../sockets/socketHandlers';

export default function InsideProjectPage() {
  const { id } = useParams();
  const [projeto, setProjeto] = useState(null);
  const [selectedCategoria, setSelectedCategoria] = useState(null);
  const [selectedTopico, setSelectedTopico] = useState(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [novaCategoriaNome, setNovaCategoriaNome] = useState('');
  const [isCriandoCategoria, setIsCriandoCategoria] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const fetchProjeto = async () => {
      try {
        const resposta = await obterProjetoCompleto(id);
        const projetoCompleto = resposta.projeto;
        setProjeto(projetoCompleto);

        // Obter userId do localStorage
        const userData = JSON.parse(localStorage.getItem('utilizador'));
        const userId = userData?._id || userData?.id;

        if (!userId) {
          console.warn('⚠️ Utilizador não encontrado no localStorage');
          return;
        }

        // Configurar eventos do socket (inclui entrar na sala do projeto)
        configurarSocketEventos(socket, projetoCompleto._id, setProjeto, setOnlineUsers);
      } catch (erro) {
        console.error("❌ Erro ao obter projeto:", erro);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjeto();

    return () => {
      socket.off('projetoAtualizado');
      socket.off('projectOnlineUsers');

      // Sair da sala ao fechar a página
      const userData = JSON.parse(localStorage.getItem('utilizador'));
      const userId = userData?._id || userData?.id;
      socket.emit('sairProjeto', { projectId: id, userId });
    };
  }, [id]);

  if (isLoading || !projeto) {
    return <LoadingScreen nomeProjeto={projeto?.nome || '...'} />;
  }

  return (
    <div className={styles.container}>
      <InsideNavbar projetoNome={projeto.nome} projeto={projeto} onlineUsers={onlineUsers}/>
      <div className={styles.body}>
        <InsideSidebar 
          projeto={projeto}
          projetoNome={projeto.nome}
          categorias={projeto.categorias}
          setCategorias={(novasCategorias) =>
            setProjeto((prev) => ({ ...prev, categorias: novasCategorias }))
          }
          selectedCategoria={selectedCategoria}
          setSelectedCategoria={setSelectedCategoria}
          selectedTopico={selectedTopico}
          setSelectedTopico={setSelectedTopico}
        />
        <div className={styles.mainContent}>
          <div className={styles.chatPlaceholder}>
            <h2>Chat</h2>
            <p>Aqui será exibido o chat da categoria/tópico selecionado.</p>
          </div>
          <button className={styles.taskButton} onClick={() => setShowTaskModal(true)}>
            Ver Tarefas
          </button>
          {showTaskModal && (
            <div className={styles.taskModal}>
              <div className={styles.modalContent}>
                <h3>Lista de Tarefas</h3>
                <button onClick={() => setShowTaskModal(false)}>Fechar</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
