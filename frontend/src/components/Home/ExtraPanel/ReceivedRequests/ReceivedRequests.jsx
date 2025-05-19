import { useEffect, useState } from 'react';
import { listarPedidosPendentes, responderPedido } from '../../../../services/api';
import styles from './ReceivedRequests.module.css';
import { FaCheck, FaTimes } from 'react-icons/fa';

export default function ReceivedRequests({ onPedidoAceite, onPedidoAtualizado }) {
  const [pedidos, setPedidos] = useState([]);
  const [tab, setTab] = useState('amizade');
  const [fadeOutIds, setFadeOutIds] = useState([]);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const resposta = await listarPedidosPendentes();
        setPedidos(resposta.recebidos || []);
      } catch (erro) {
        console.error("❌ Erro ao buscar pedidos:", erro);
      }
    };

    fetchPedidos();
  }, []);

  const handleResposta = async (idPedido, resposta) => {
    try {
      await responderPedido(idPedido, resposta);
      setFadeOutIds(prev => [...prev, idPedido]);

      setTimeout(() => {
        setPedidos(prev => prev.filter(p => p._id !== idPedido));

        if (resposta === 'aceite' && onPedidoAceite) {
          onPedidoAceite(); // Atualiza lista de amigos
        }

        if (onPedidoAtualizado) {
          onPedidoAtualizado(); // Atualiza pedidos pendentes
        }
      }, 300);
    } catch (erro) {
      console.error(`❌ Erro ao responder pedido (${resposta}):`, erro);
    }
  };

  const pedidosFiltrados = pedidos.filter(p => p.tipo === tab);

  return (
    <div className={styles.receivedContainer}>
      <div className={styles.tabs}>
      <button
            className={tab === 'amizade' ? styles.active : ''}
            onClick={() => setTab('amizade')}
            >
            Friend Requests
            {pedidos.some(p => p.tipo === 'amizade') && (
                <span className={styles.pill}></span>
            )}
            </button>

            <button
            className={tab === 'projeto' ? styles.active : ''}
            onClick={() => setTab('projeto')}
            >
            Project Invitations
            {pedidos.some(p => p.tipo === 'projeto') && (
                <span className={styles.pill}></span>
            )}
            </button>
        </div>

      {pedidosFiltrados.length === 0 ? (
        <p className={styles.placeholder}>
          {tab === 'amizade' ? 'No friend requests.' : 'No project invitations.'}
        </p>
      ) : (
        pedidosFiltrados.map(pedido => {
          const avatar = `https://i.pravatar.cc/150?u=${pedido.de._id}`;
          const identificador = `#${pedido.de._id.slice(-4)}`;
          const isFadingOut = fadeOutIds.includes(pedido._id);

          return (
            <div
              key={pedido._id}
              className={`${styles.card} ${isFadingOut ? styles.fadeOut : ''}`}
            >
              {tab === 'amizade' ? (
                <>
                  <div className={styles.topSection}>
                    <img src={avatar} alt="avatar" className={styles.avatar} />
                    <div className={styles.userText}>
                      <strong>{pedido.de.firstName} {pedido.de.lastName}</strong>
                      <span className={styles.identifier}>{identificador}</span>
                    </div>
                  </div>
                  <div className={styles.actions}>
                    <button className={styles.accept} onClick={() => handleResposta(pedido._id, 'aceite')}>
                      <FaCheck />
                    </button>
                    <button className={styles.reject} onClick={() => handleResposta(pedido._id, 'recusado')}>
                      <FaTimes />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className={styles.projectInvite}>
                    Join {pedido.de.firstName}'s project
                  </p>
                  <p className={styles.projectName}>
                    “{pedido.idProjeto?.nome || 'Unknown Project'}”
                  </p>
                  <div className={styles.actions}>
                    <button className={styles.accept} onClick={() => handleResposta(pedido._id, 'aceite')}>
                      <FaCheck />
                    </button>
                    <button className={styles.reject} onClick={() => handleResposta(pedido._id, 'recusado')}>
                      <FaTimes />
                    </button>
                  </div>
                </>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
