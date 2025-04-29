import styles from './LastActivities.module.css';

export default function LastActivities() {
  // Mock data temporário
  const activities = [
    { id: 1, project: 'WorkNest', action: 'Created Category "Frontend"' },
    { id: 2, project: 'WorkNest', action: 'Added Topic "UI Design"' },
    { id: 3, project: 'Zenith', action: 'Created Project' },
  ];

  return (
    <div className={styles.activitiesList}>
      {activities.map(activity => (
        <div key={activity.id} className={styles.activityItem}>
          <strong>{activity.project}</strong>
          <p>{activity.action}</p>
        </div>
      ))}
    </div>
  );
}
