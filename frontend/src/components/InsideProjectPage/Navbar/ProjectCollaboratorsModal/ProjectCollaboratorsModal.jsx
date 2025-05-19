import { useEffect, useState } from 'react';
import styles from './ProjectCollaboratorsModal.module.css';
import { FaTimes, FaStar } from 'react-icons/fa';
import { enviarPedidoProjeto, listarPedidosPendentes } from '../../../../services/api';

export default function ColaboradoresModal({ projeto, userId, onClose, onlineUsers }) {
  const [amigos, setAmigos] = useState([]);
  const [enviados, setEnviados] = useState([]);

  const isOwner = projeto?.owner?._id === userId;
  const identificadorOwner = projeto?.owner?.identificador || projeto?.owner?._id?.slice(-4);

  const estaOnline = (id) => onlineUsers?.includes(id);

  const renderAvatar = (id, showStatus = true) => {
    const avatarUrl = `https://i.pravatar.cc/150?u=${id}`;
    const online = estaOnline(id);
    return (
      <div className={styles.avatarWrapper}>
        <img src={avatarUrl} alt="avatar" className={styles.avatar} />
        {showStatus && (
          <span className={`${styles.statusDot} ${online ? styles.online : styles.offline}`} />
        )}
      </div>
    );
  };

  const handleConvidar = async (amigoId) => {
    try {
      const resposta = await enviarPedidoProjeto({
        para: amigoId,
        idProjeto: projeto._id
      });

      if (resposta.sucesso) {
        setEnviados((prev) => [...prev, amigoId]);
      }
    } catch (erro) {
      alert(erro.mensagem || 'Erro ao convidar utilizador.');
    }
  };

  useEffect(() => {
    const amigosGuardados = JSON.parse(localStorage.getItem('amigos')) || [];
    setAmigos(amigosGuardados);

    const carregarPedidosProjeto = async () => {
      try {
        const resposta = await listarPedidosPendentes();
        const pedidosProjeto = resposta.enviados.filter(
          (p) => p.tipo === 'projeto' && p.idProjeto === projeto._id
        );
        const idsEnviados = pedidosProjeto.map((p) => p.para._id);
        setEnviados(idsEnviados);
      } catch (erro) {
        console.error('❌ Erro ao carregar pedidos pendentes de projeto:', erro);
      }
    };

    carregarPedidosProjeto();
  }, [projeto._id]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Colaboradores</h2>
          <button onClick={onClose}>✖</button>
        </div>

        <div className={styles.content}>
          <div className={styles.leftPane}>
            <div className={styles.ownerSection}>
              <h3>👑 Owner</h3>
              <div className={styles.ownerCard}>
                {renderAvatar(projeto?.owner?._id)}
                <div className={styles.ownerInfo}>
                  <p className={styles.name}>
                    {projeto?.owner?.firstName} {projeto?.owner?.lastName}
                    <span className={styles.id}>
                      &nbsp;&nbsp;#{identificadorOwner}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.collabSection}>
              <h3>🤝 Collaborators</h3>
              {Array.isArray(projeto?.colaboradores) && projeto.colaboradores.length > 0 ? (
                projeto.colaboradores.map((colab) => (
                  <div key={colab._id} className={styles.card}>
                    {renderAvatar(colab._id)}
                    <div>
                      <p className={styles.name}>
                        {colab.firstName} {colab.lastName}
                      </p>
                      <p className={styles.id}>#{colab.identificador}</p>
                    </div>
                    {isOwner && (
                      <div className={styles.actions}>
                        <FaStar title="Transferir posse" className={styles.star} />
                        <FaTimes title="Remover" className={styles.remove} />
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className={styles.noCollaborators}>Sem colaboradores.</p>
              )}
            </div>
          </div>

          <div className={styles.rightPane}>
            <h3>📚 Amigos</h3>
            <div className={styles.amigosList}>
              {Array.isArray(amigos) && amigos.length > 0 ? (
                amigos.map((amigo) => (
                  <div key={amigo._id} className={styles.amigoCard}>
                    {renderAvatar(amigo._id, false)}
                    <div>
                      <p className={styles.name}>
                        {amigo.firstName} {amigo.lastName}
                        <span className={styles.id}>  #{amigo.identificador}</span>
                      </p>
                    </div>
                    <button
                      className={styles.inviteBtn}
                      onClick={() => handleConvidar(amigo._id)}
                      disabled={enviados.includes(amigo._id)}
                    >
                      {enviados.includes(amigo._id) ? 'Convidado' : '+ Convidar'}
                    </button>
                  </div>
                ))
              ) : (
                <p className={styles.noAmigos}>Nenhum amigo disponível.</p>
              )}
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <button className={styles.leaveBtn}>
            {isOwner ? 'Transferir posse e sair' : 'Sair do projeto'}
          </button>
        </div>
      </div>
    </div>
  );
}
