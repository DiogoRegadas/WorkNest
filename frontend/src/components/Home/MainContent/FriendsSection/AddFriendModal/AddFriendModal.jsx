import { useState, useEffect } from 'react';
import { pesquisarUtilizadores, enviarPedidoAmizade } from '../../../../../services/api';
import styles from './AddFriendModal.module.css';
import { FaTimes } from 'react-icons/fa';

export default function AddFriendModal({ onClose, onPedidoEnviado }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [resultados, setResultados] = useState([]);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose(); // só fecha após a animação
    }, 400); // igual à duração da animação CSS
  };
  useEffect(() => {
    const fetchUsers = async () => {
      if (searchTerm.trim() === '') {
        setResultados([]);
        return;
      }

      try {
        const utilizadores = await pesquisarUtilizadores(searchTerm);

        const utilizadoresComAvatar = utilizadores.map(user => ({
          ...user,
          avatar: `https://i.pravatar.cc/150?u=${user._id}`
        }));

        setResultados(utilizadoresComAvatar);
      } catch (error) {
        console.error("❌ Erro ao pesquisar utilizadores:", error);
        setResultados([]);
      }
    };

    const debounce = setTimeout(fetchUsers, 300); // debounce de 300ms
    return () => clearTimeout(debounce);
  }, [searchTerm]);

  const handleSendRequest = async (userId) => {
    try {
      const resposta = await enviarPedidoAmizade(userId);
      onPedidoEnviado();
      alert(`✅ ${resposta.mensagem}`);
      onClose();
      // Atualiza o estado local para refletir o pedido enviado
      setResultados(prev =>
        prev.map(u =>
          u._id === userId ? { ...u, pedidoEnviado: true } : u
        )
      );
    } catch (erro) {
      alert(`❌ ${erro.mensagem || 'Erro ao enviar pedido.'}`);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={`${styles.modal} ${isClosing ? styles.fadeOut : styles.fadeIn}`}>
        <button className={styles.closeButton} onClick={handleClose}>
          <FaTimes />
        </button>

        <h2>Add a Friend</h2>

        <input
          type="text"
          placeholder="Search for users..."
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className={styles.results}>
          {searchTerm === '' ? (
            <p className={styles.placeholder}>Search for people...</p>
          ) : resultados.length === 0 ? (
            <p className={styles.placeholder}>No users found.</p>
          ) : (
            resultados.map(user => (
              <div key={user._id} className={styles.userCard}>
                <img src={user.avatar} alt="avatar" className={styles.avatar} />
                <div className={styles.userInfo}>
                  <span>{user.firstName} {user.lastName}</span>
                  <span className={styles.identifier}>{user.identificador}</span>
                </div>

                {user.pedidoEnviado ? (
                  <button className={styles.sentButton} disabled>
                    Request Sent
                  </button>
                ) : (
                  <button
                    className={styles.sendButton}
                    onClick={() => handleSendRequest(user._id)}
                  >
                    Send Request
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
