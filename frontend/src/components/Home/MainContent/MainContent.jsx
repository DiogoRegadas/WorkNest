import { useState, useEffect } from 'react';
import { listarProjetos } from '../../../services/api';

import SearchBar from './SearchBar/SearchBar';
import ViewOptions from './ViewOptions/ViewOptions';
import ProjectList from './ProjectList/ProjectList';
import EmptyState from './EmptyState/EmptyState';
import CreateProjectButton from './CreateProjectButton/CreateProjectButton';
import CreateProjectModal from './CreateProjectModal/CreateProjectModal';
import styles from './MainContent.module.css';

export default function MainContent({ setSelectedProject }) {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('lastUpdated');
  const [showModal, setShowModal] = useState(false); // novo estado para controlar o modal


  useEffect(() => {
    const fetchProjetos = async () => {
      try {
        const resposta = await listarProjetos();
        setProjects(resposta.projetos || []); // resposta.projetos vem do backend
      } catch (error) {
        console.error('❌ Erro ao listar projetos:', error);
      }
    };

    fetchProjetos();
  }, []); // <- Só corre uma vez ao montar



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
      <div className={styles.topBar}>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <ViewOptions sortOption={sortOption} setSortOption={setSortOption} />
      </div>

      <div className={styles.contentArea}>
        <div className={styles.projectListWrapper}>
          {filteredProjects.length > 0 ? (
            <ProjectList projects={filteredProjects} 
            onHoverProject={setSelectedProject} />
          ) : (
            <EmptyState />
          )}
        </div>

        


        <div className={styles.bottomBar}>
          <CreateProjectButton onClick={() => setShowModal(true)} />
        </div>
      </div>

      {/* Modal aparece aqui */}
      {showModal && <CreateProjectModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
