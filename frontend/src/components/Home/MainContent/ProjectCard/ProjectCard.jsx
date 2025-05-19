import styles from './ProjectCard.module.css';
import { useNavigate } from 'react-router-dom';




// Atualizar a função formatTimeAgo para inglês e correto
const formatTimeAgo = (dateString) => {
  const now = new Date();
  const updated = new Date(dateString);
  const diffMs = now - updated;
  const diffMinutes = Math.floor(diffMs / 60000);

  if (diffMinutes < 1) return 'Just now';
  if (diffMinutes < 60) return `${diffMinutes} min ago`;
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
};

export default function ProjectCard({ project }) {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/projeto/${project._id}`); // envia o ID do projeto
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      {/* Left Side */}
      <div className={styles.left}>
        <h3 className={styles.title}>{project.nome}</h3>
        <p className={styles.lastActivity}>
          Last activity: {formatTimeAgo(project.updatedAt)}
        </p>
      </div>

      {/* Separator */}
      <div className={styles.separator}></div>

      {/* Right Side */}
      <div className={styles.right}>
        <div className={styles.infoBlock}>
          <span className={styles.infoLabel}>Categories</span>
          <span className={styles.infoValue}>{project.listaCategorias?.length || 0}</span>
        </div>
        <div className={styles.infoBlock}>
          <span className={styles.infoLabel}>Topics</span>
          <span className={styles.infoValue}>0</span>
        </div>
      </div>
    </div>
  );
}
