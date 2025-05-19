import { useEffect, useState } from 'react';
import { FaFolder, FaUserFriends, FaCalendarAlt } from 'react-icons/fa';
import styles from './Sidebar.module.css';

export default function Sidebar({ secaoAtiva, setSecaoAtiva, numPedidosPendentes }) {
  const [fadeDescription, setFadeDescription] = useState(false);

  const menuItems = [
    { name: 'Projetos', icon: <FaFolder /> },
    { name: 'Amigos', icon: <FaUserFriends />, notificar: numPedidosPendentes > 0 },
    { name: 'Calendário', icon: <FaCalendarAlt /> },
  ];

  const descriptions = {
    Projetos: 'Explore all your personal and team projects. Create new projects, organize tasks by categories, collaborate with your team members, and keep track of progress over time',
    Amigos: 'Manage your connections with classmates, colleagues, and collaborators. Add new friends, create groups, and easily invite them to work together on shared projects',
    Calendário: 'View all your upcoming deadlines, meetings, and events in one place. Stay organized by linking tasks and project milestones directly to your calendar',
  };

  useEffect(() => {
    setFadeDescription(true);
    const timeout = setTimeout(() => setFadeDescription(false), 300);
    return () => clearTimeout(timeout);
  }, [secaoAtiva]);

  return (
    <div className={styles.sidebarContainer}>
      {menuItems.map((item) => (
        <div
          key={item.name}
          className={`${styles.menuItem} ${secaoAtiva === item.name ? styles.active : ''}`}
          onClick={() => setSecaoAtiva(item.name)}
        >
          <div className={styles.menuItemContent}>
            <span className={styles.icon}>{item.icon}</span>
            <span>{item.name}</span>
          </div>

          {item.notificar && (
            <span className={styles.notificationDot}>
              {numPedidosPendentes}
            </span>
          )}
        </div>
      ))}

      <div className={styles.separator}></div>

      <div className={`${styles.description} ${fadeDescription ? styles.fadeIn : ''}`}>
        {descriptions[secaoAtiva]}
      </div>
    </div>
  );
}
