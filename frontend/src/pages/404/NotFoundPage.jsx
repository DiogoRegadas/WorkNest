// src/pages/NotFoundPage.jsx
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <div className={styles.container}>
      <h1>404 - Página não encontrada</h1>
      <p>A página que procuras não existe ou foi movida.</p>
      <Link to="/home" className={styles.link}>Voltar à Página Inicial</Link>
    </div>
  );
}
