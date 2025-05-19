// components/MainContent/FriendsSection/FriendList/FriendList.jsx
import styles from './FriendsList.module.css';
import FriendCard from '../FriendsCard/FriendsCard';

export default function FriendList({ friends }) {
  return (
    <div className={styles.friendList}>
      {friends?.length > 0 ? (
  friends.map(friend => (
    <FriendCard key={friend._id} friend={friend} />
  ))
) : (
  <p>No friends found.</p>
)}
    </div>
  );
}
