import styles from './featureCard.module.css';

export default function FeatureSection() {
  return (
    <section className={styles.container}>
      <div className={styles.cardPequeno}>
        <h3>Gestão de Projetos</h3>
        <p>Organiza, colabora e acompanha os teus projetos em tempo real.</p>
      </div>

      <div className={styles.cardGrande}>
        <h3>Tarefas & Progresso</h3>
        <p>Acompanha o estado das tarefas e mantém a equipa alinhada.</p>
      </div>
    </section>
  );
}
