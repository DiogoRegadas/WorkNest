import { useState, useEffect } from 'react';
import { listarProjetos } from '../../../services/api';

import SearchBar from './SearchBar/SearchBar';
import ViewOptions from './ViewOptions/ViewOptions';
import ProjectList from './ProjectList/ProjectList';
import EmptyState from './EmptyState/EmptyState';
import CreateProjectButton from './CreateProjectButton/CreateProjectButton';
import CreateProjectModal from './CreateProjectModal/CreateProjectModal';
import FriendsSection from './FriendsSection/FriendsSection';

import styles from './MainContent.module.css';

export default function MainContent({ secaoAtiva, setSelectedProject, amigos, fetchAmigos, onPedidoEnviado }) {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('lastUpdated');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (secaoAtiva === 'Projetos') {
      const fetchProjetos = async () => {
        try {
          const resposta = await listarProjetos();
          setProjects(resposta.projetos || []);
        } catch (error) {
          console.error('❌ Erro ao listar projetos:', error);
        }
      };
      fetchProjetos();
    }
  }, [secaoAtiva]);

  const filteredProjects = projects
    .filter(p => p.nome.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortOption === 'alphabetical') {
        return a.nome.localeCompare(b.nome);
      } else {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      }
    });

  return (
    <div className={styles.mainContainer}>
      {secaoAtiva === 'Projetos' && (
        <>
          <div className={styles.topBar}>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <ViewOptions sortOption={sortOption} setSortOption={setSortOption} />
          </div>

          <div className={styles.contentArea}>
            <div className={styles.projectListWrapper}>
              {filteredProjects.length > 0 ? (
                <ProjectList projects={filteredProjects} onHoverProject={setSelectedProject} />
              ) : (
                <EmptyState />
              )}
            </div>

            <div className={styles.bottomBar}>
              <CreateProjectButton onClick={() => setShowModal(true)} />
            </div>
          </div>

          {showModal && <CreateProjectModal onClose={() => setShowModal(false)} />}
        </>
      )}

      {secaoAtiva === 'Amigos' && (
        <div className={styles.friendsSectionWrapper}>
          <FriendsSection friends={amigos} 
            fetchAmigos={fetchAmigos} 
            onPedidoEnviado={onPedidoEnviado} />
        </div>
      )}

      {secaoAtiva === 'Calendário' && (
        <div className={styles.calendarPlaceholder}>
          <p style={{ textAlign: 'center', marginTop: '20px' }}>
            Calendário em construção...
          </p>
        </div>
      )}
    </div>
  );
}
