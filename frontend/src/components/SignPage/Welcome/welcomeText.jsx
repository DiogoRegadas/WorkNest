import styles from './WelcomeText.module.css';

export default function WelcomeText() {
  return (
    <div className={styles.welcomeWrapper}>
      <h2 className={styles.smallText}>Welcome</h2>
      <h1 className={styles.bigText}>WorkNest</h1>
    </div>
  );
}
