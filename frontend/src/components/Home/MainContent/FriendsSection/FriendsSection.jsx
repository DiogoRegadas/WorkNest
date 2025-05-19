import { useState } from 'react';
import styles from './FriendsSection.module.css';
import FriendList from './FriendsList/FriendsList';
import { FaUserPlus } from 'react-icons/fa';
import AddFriendModal from './AddFriendModal/AddFriendModal';

export default function FriendsSection({ friends, fetchAmigos, onPedidoEnviado }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);

  const filteredFriends = friends?.filter(friend =>
    `${friend.firstName} ${friend.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className={styles.friendsContainer}>
        <div className={styles.topBar}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search friends..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className={styles.addButton} onClick={() => setShowModal(true)}>
            <FaUserPlus className={styles.icon} />
            Add Friend
          </button>
        </div>

        <p className={styles.friendsCount}>Friends: {friends?.length || 0}</p>

        <div className={styles.contentWrapper}>
          {(!filteredFriends || filteredFriends.length === 0) ? (
            <div className={styles.noFriendsMessage}>No Friends Found</div>
          ) : (
            <FriendList friends={filteredFriends} />
          )}
        </div>
      </div>

      {showModal && (
        <AddFriendModal
          onClose={() => setShowModal(false)}
          onFriendAdded={fetchAmigos}
          onPedidoEnviado={onPedidoEnviado}
        />
      )}
    </>
  );
}
