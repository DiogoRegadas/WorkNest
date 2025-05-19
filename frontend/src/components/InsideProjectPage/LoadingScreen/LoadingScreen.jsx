import styles from './LoadingScreen.module.css';

export default function LoadingScreen({ nomeProjeto }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.box}>
        <p className={styles.text}>Loading <strong>{nomeProjeto}</strong></p>
        <div className={styles.progressBar}>
          <div className={styles.progress} />
        </div>
      </div>
    </div>
  );
}
