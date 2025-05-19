import styles from './Properties.module.css';

export default function Properties({ selectedProject }) {
  if (!selectedProject) {
    return <p className={styles.noProject}>Hover over a project to see details.</p>;
  }

  return (
    <div className={styles.propertiesContent}>
      <div className={styles.propertyItem}>
        <span className={styles.propertyLabel}>Name:</span>
        <span className={styles.propertyValue}>{selectedProject.nome}</span>
      </div>

      <div className={styles.propertyItem}>
        <span className={styles.propertyLabel}>Description:</span>
        <span className={styles.propertyValue}>
          {selectedProject.descricao || 'No description'}
        </span>
      </div>

      <div className={styles.propertyItem}>
        <span className={styles.propertyLabel}>Owner:</span>
        <span className={styles.propertyValue}>
          {selectedProject.owner ? `${selectedProject.owner.firstName} ${selectedProject.owner.lastName}` : 'Unknown Owner'}
        </span>
      </div>

      <div className={styles.propertyItem}>
        <span className={styles.propertyLabel}>Categories:</span>
        <span className={styles.propertyValue}>
          {selectedProject.listaCategorias?.length || 0}
        </span>
      </div>
    </div>
  );
}
