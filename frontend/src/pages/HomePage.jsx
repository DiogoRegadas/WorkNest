import styles from '../components/Home/Home.module.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { obterAmigos, listarPedidosPendentes } from '../services/api';

import Navbar from '../components/Home/Navbar/Navbar';
import Sidebar from '../components/Home/Sidebar/Sidebar';
import MainContent from '../components/Home/MainContent/MainContent';
import ExtraPanel from '../components/Home/ExtraPanel/ExtraPanel';

export default function HomePage() {
  const [secaoAtiva, setSecaoAtiva] = useState('Projetos');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [amigos, setAmigos] = useState([]);
  const [refreshPedidos, setRefreshPedidos] = useState(false);
  const [numPedidosPendentes, setNumPedidosPendentes] = useState(0);

  const navigate = useNavigate();

  const startLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      localStorage.removeItem("utilizador");
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      navigate("/");
    }, 1000);
  };

  const triggerRefreshPedidos = () => {
    setRefreshPedidos(prev => !prev);
  };

  const fetchAmigos = async () => {
    try {
      const resposta = await obterAmigos();
      let amigos = resposta.amigos || [];

      amigos = amigos.map(amigo => ({
        ...amigo,
        identificador: amigo._id.slice(-4)
      }));

      setAmigos(amigos);
      localStorage.setItem('amigos', JSON.stringify(amigos));
    } catch (erro) {
      console.error("❌ Erro ao obter amigos:", erro);
    }
  };

  useEffect(() => {
    fetchAmigos();
  }, []);

  useEffect(() => {
    const fetchPedidosPendentes = async () => {
      try {
        const resposta = await listarPedidosPendentes();
        const recebidos = resposta?.recebidos || [];
        console.log("Pedidos recebidos:", recebidos.length);
        setNumPedidosPendentes(recebidos.length);
      } catch (erro) {
        console.error("❌ Erro ao carregar pedidos pendentes:", erro);
      }
    };

    fetchPedidosPendentes();
  }, [refreshPedidos]);

  return (
    <div className={`${styles.homeContainer} ${isLoggingOut ? styles.fadeOut : ''}`}>
      <div className={styles.navbar}>
        <Navbar onStartLogout={startLogout} />
      </div>

      <div className={styles.content}>
        <div className={styles.sidebar}>
          <Sidebar
            secaoAtiva={secaoAtiva}
            setSecaoAtiva={setSecaoAtiva}
            numPedidosPendentes={numPedidosPendentes}
          />
        </div>

        <div className={styles.main}>
          <MainContent
            secaoAtiva={secaoAtiva}
            setSelectedProject={setSelectedProject}
            amigos={amigos}
            fetchAmigos={fetchAmigos}
            onPedidoEnviado={triggerRefreshPedidos}
          />
        </div>

        <div className={styles.extraPanel}>
          <ExtraPanel
            selectedProject={selectedProject}
            secaoAtiva={secaoAtiva}
            refreshAmigos={fetchAmigos}
            refreshPedidosTrigger={triggerRefreshPedidos}
          />
        </div>
      </div>
    </div>
  );
}
