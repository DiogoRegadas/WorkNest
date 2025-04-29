import styles from './Properties.module.css';

export default function Properties({ selectedProject }) {
  if (!selectedProject) {
    return <p className={styles.noProject}>Hover over a project to see details.</p>;
  }

  return (
    <div className={styles.propertiesContent}>
      <h3>{selectedProject.nome}</h3>
      <p><strong>Description:</strong> {selectedProject.descricao}</p>
      <p><strong>Owner:</strong> {selectedProject.owner ? `${selectedProject.owner.firstName} ${selectedProject.owner.lastName}` : 'Unknown Owner'}
      </p>
      <p><strong>Categories:</strong> {selectedProject.listaCategorias?.length || 0}</p>
    </div>
  );
}
