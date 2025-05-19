import { useState } from 'react';
import styles from './InsideNavbar.module.css';
import ProfileModal from '../../Home/Navbar/ProfileModal/ProfileModal';
import ColaboradoresModal from './ProjectCollaboratorsModal/ProjectCollaboratorsModal';

import { FaUserFriends, FaQuestionCircle } from 'react-icons/fa';

export default function InsideNavbar({ onStartLogout, projeto }) {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showColabModal, setShowColabModal] = useState(false);
  const [hovering, setHovering] = useState(false);

  const userData = JSON.parse(localStorage.getItem('utilizador')) || {};
  const { firstName = '', lastName = '', identificador = '' } = userData;
  const numColaboradores = projeto.colaboradores?.length || 0;

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.leftContent}>
          <span className={styles.title}>WORKNEST</span>
        </div>

        <div className={styles.rightContent}>
          <button
            className={styles.iconButton}
            onClick={() => setShowColabModal(true)}
            aria-label="Ver colaboradores do projeto"
          >
            <span className={styles.collabBadge} aria-hidden="true">
              {numColaboradores}
            </span>
            <FaUserFriends className={styles.icon} />
            <span>Colaboradores</span>
          </button>

          <button className={styles.iconButton}>
            <FaQuestionCircle className={styles.icon} />
            <span>Ajuda</span>
          </button>

          <div
            className={styles.userBox}
            onClick={() => setShowProfileModal(!showProfileModal)}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            <div className={styles.avatar}></div>
            <div className={styles.userInfo}>
              <span className={styles.name}>{firstName} {lastName}</span>
              <span className={styles.identifier}>{identificador}</span>
            </div>
          </div>

          {showProfileModal && (
            <ProfileModal onStartLogout={onStartLogout} />
          )}
        </div>
      </nav>

      {/* Modal de Colaboradores fora da Navbar */}
      {showColabModal && (
        <ColaboradoresModal
          onClose={() => setShowColabModal(false)}
          projeto={projeto}
        />
      )}
    </>
  );
}
