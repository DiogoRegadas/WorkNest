import { useEffect, useState } from 'react';
import styles from './ProjectCollaboratorsModal.module.css';
import { useAlert } from '../../../../context/AlertContext';
import { FaTimes, FaStar } from 'react-icons/fa';
import { enviarPedidoProjeto, listarPedidosPendentes, removerColaborador, transferirOwnerProjeto } from '../../../../services/api';

export default function ColaboradoresModal({ projeto, onClose, onlineUsers }) {
  const [userId, setUserId] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [amigos, setAmigos] = useState([]);
  const [enviados, setEnviados] = useState([]);
  const { showAlert, showConfirm } = useAlert();

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

  const handleRemoverColaborador = (colabId) => {
    showConfirm(
      'Tens a certeza que queres remover este colaborador?',
      async () => {
        try {
          const resposta = await removerColaborador(projeto._id, colabId);
          showAlert(resposta.mensagem || 'Colaborador removido.', 'sucesso');
          // WebSocket atualiza o projeto automaticamente
        } catch (erro) {
          showAlert(erro.mensagem || 'Erro ao remover colaborador.', 'erro');
        }
      },
      () => {
        showAlert('Remoção cancelada.', 'erro');
      }
    );
  };
  
  
  const handleTransferirPosse = (novoOwnerId) => {
    showConfirm(
      'Tens a certeza que queres transferir a posse do projeto?',
      async () => {
        try {
          const resposta = await transferirOwnerProjeto(projeto._id, novoOwnerId);
          showAlert(resposta.mensagem || 'Posse transferida.', 'sucesso');
  
          // Atualiza isOwner localmente (antes do socket emitir)
          if (userId === novoOwnerId) {
            setIsOwner(true);
          } else {
            setIsOwner(false);
          }
        } catch (erro) {
          showAlert(erro.mensagem || 'Erro ao transferir posse.', 'erro');
        }
      },
      () => {
        showAlert('Transferência cancelada.', 'erro');
      }
    );
  };
  
  

  useEffect(() => {
    const userDataRaw = localStorage.getItem('utilizador');
    console.log('🔍 Dados do localStorage:', userDataRaw);
    try {
      const userData = JSON.parse(userDataRaw);
      if (userData && userData._id) {
        setUserId(userData.id);
      }
    } catch (e) {
      console.error('❌ Erro ao fazer parse do utilizador:', e);
    }
  }, []);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('utilizador'));
    if (userData && userData.id) {
      setUserId(userData.id);
    }
  }, []);

  useEffect(() => {
    if (userId && projeto?.owner?._id) {
      setIsOwner(userId === projeto.owner._id);
    }
  }, [userId, projeto?.owner?._id]);

  useEffect(() => {
    const amigosGuardados = JSON.parse(localStorage.getItem('amigos')) || [];

    const idsNoProjeto = [
      projeto?.owner?._id,
      ...(projeto?.listaUtilizadores?.map(u => u._id) || [])
    ];

    const amigosFiltrados = amigosGuardados.filter(
      amigo => !idsNoProjeto.includes(amigo._id)
    );

    setAmigos(amigosFiltrados);

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
  }, [projeto._id, projeto?.owner?._id, projeto?.listaUtilizadores]);

  console.log('owner:', isOwner, 'userId:', userId);

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
                    <span className={styles.id}>  #{identificadorOwner}</span>
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.collabSection}>
              <h3>🤝 Collaborators</h3>
              {Array.isArray(projeto?.listaUtilizadores) && projeto.listaUtilizadores.length > 0 ? (
                projeto.listaUtilizadores.map((colab) => (
                  <div key={colab._id} className={styles.card}>
                    {renderAvatar(colab._id)}
                    <div>
                      <p className={styles.name}>
                        {colab.firstName} {colab.lastName}
                        <span className={styles.id}>#{colab._id.slice(-4)}</span>
                      </p>
                    </div>
                    {isOwner && (
                      <div className={styles.actions}>
                        <FaStar
                            title="Transferir posse"
                            className={styles.star}
                            onClick={() => handleTransferirPosse(colab._id)}
                          />
                          <FaTimes
                            title="Remover"
                            className={styles.remove}
                            onClick={() => handleRemoverColaborador(colab._id)}
                          />

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
