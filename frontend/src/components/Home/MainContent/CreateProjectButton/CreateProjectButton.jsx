import styles from './CreateProjectButton.module.css';

export default function CreateProjectButton({onClick}) {
  return (
    <button className={styles.createButton} onClick={onClick}>
      Create New Project
    </button>
  );
}
