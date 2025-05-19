import { useEffect, useState } from 'react';
import { listarPedidosPendentes } from '../../../../services/api'; 
import ReceivedRequests from '../ReceivedRequests/ReceivedRequests';
import styles from './AmigosExtraPanel.module.css';

export default function AmigosExtraPanel({ refreshTrigger, fetchAmigos }) {
    const [enviados, setEnviados] = useState([]);
  
    const refreshAmigos = () => {
      if (fetchAmigos) fetchAmigos();
    };
  
    const refreshPedidos = () => {
      // dispara o efeito em HomePage
      if (typeof refreshTrigger === 'function') {
        refreshTrigger();
      }
    };
  
    useEffect(() => {
      const fetchPedidos = async () => {
        try {
          const resposta = await listarPedidosPendentes();
          setEnviados(resposta.enviados || []);
        } catch (erro) {
          console.error("❌ Erro ao carregar pedidos:", erro);
        }
      };
  
      fetchPedidos();
    }, [refreshTrigger]);
  
    return (
      <div className={styles.amigosPanel}>
        <div className={styles.recebidosWrapper}>
          <ReceivedRequests 
            onPedidoAceite={refreshAmigos}
            onPedidoAtualizado={refreshPedidos}
          />
        </div>
  
        <div className={styles.enviadosFixed}>
          <h3>Sent Requests</h3>
          {enviados.length === 0 ? (
            <p className={styles.placeholder}>
              You haven’t sent any friend requests yet.
            </p>
          ) : (
            enviados.map(pedido => {
              const avatar = `https://i.pravatar.cc/150?u=${pedido.para._id}`;
              const identificador = `#${pedido.para._id.slice(-4)}`;
              const isProjeto = pedido.tipo === 'projeto';
  
              return (
                <div key={pedido._id} className={styles.card}>
                  <div className={styles.topSection}>
                    <img src={avatar} alt="avatar" className={styles.avatar} />
                    <div className={styles.nameBlock}>
                      <strong>{pedido.para.firstName} {pedido.para.lastName}</strong>
                      <span className={styles.identifier}>{identificador}</span>
                    </div>
                  </div>
                  <div className={styles.pending}>
                    {isProjeto
                      ? `Join "${pedido.idProjeto?.nome || 'Project'}" pending`
                      : 'Friend request pending'}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  }
  