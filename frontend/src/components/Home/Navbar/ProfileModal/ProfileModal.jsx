import styles from './ProfileModal.module.css';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';



export default function ProfileModal({ onClose }) {

    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('utilizador');
        navigate('/');
    };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.option} onClick={() => { /* ir para perfil */ }}>
        <FaUserCircle className={styles.icon} />
        <span>Perfil</span>
      </div>
      <div className={styles.option} onClick={handleLogout}>
        <FaSignOutAlt className={styles.icon} />
        <span>Logout</span>
      </div>
    </div>
  );
}
