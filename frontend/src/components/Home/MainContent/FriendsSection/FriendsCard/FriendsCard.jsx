// components/MainContent/FriendsSection/FriendCard/FriendCard.jsx
import styles from './FriendsCard.module.css';

export default function FriendCard({ friend }) {
  const { firstName, lastName, createdAt, mutualFriends = [] } = friend;

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-GB');
  };

  const displayMutuals = () => {
    if (mutualFriends.length === 0) return 'No mutual friends';
    const names = mutualFriends.slice(0, 3).map(f => `${f.firstName}`);
    return names.join(', ') + (mutualFriends.length > 3 ? '...' : '');
  };

  return (
    <div className={styles.card}>
      <div className={styles.avatar}>{firstName.charAt(0)}</div>
      <div className={styles.info}>
        <div className={styles.name}>{firstName} {lastName}</div>
        <div className={styles.date}>Friends since {formatDate(createdAt)}</div>
        <div className={styles.mutuals}>{displayMutuals()}</div>
      </div>
    </div>
  );
}
