import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import ProfileModal from './ProfileModal/ProfileModal';

export default function Navbar({onStartLogout}) {

  const avatarImages = [
    'https://i.pravatar.cc/150?img=3',
    'https://i.pravatar.cc/150?img=5',
    'https://i.pravatar.cc/150?img=8',
    'https://i.pravatar.cc/150?img=10',
    'https://i.pravatar.cc/150?img=12'
  ];
  
  const randomIndex = Math.floor(Math.random() * avatarImages.length);
  const [avatarUrl] = useState(avatarImages[randomIndex]);
  const [user, setUser] = useState({ firstName: "", lastName: "" });
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("utilizador");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser({
        firstName: parsedUser.firstName || "",
        lastName: parsedUser.lastName || "",
        identificador: parsedUser.identificador || ""
      });
    }
  }, []);

  // Lógica para fechar o modal com fadeOut
  useEffect(() => {
    if (!hovering && showProfileModal) {
      setFadingOut(true);
      const timeout = setTimeout(() => {
        setShowProfileModal(false);
        setFadingOut(false);
      }, 300); // 300ms igual ao tempo de animação no CSS
      return () => clearTimeout(timeout);
    }
  }, [hovering, showProfileModal]);

  return (
    <nav className={styles.navbar}>
      {/* Lado esquerdo - Logo WorkNest */}
      <div className={styles.leftContent}>WORKNEST</div>

      {/* Lado direito - Cor + Utilizador */}
      <div 
        className={styles.rightContent}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <div className={styles.colorBox}></div>

        <div
          className={styles.userBox}
          onClick={() => setShowProfileModal(!showProfileModal)}
        >
          <img src={avatarUrl} alt="avatar" className={styles.avatar} />
          <div className={styles.userName}>
            <span className={styles.userFullName}>
              {user.firstName} {user.lastName}
            </span>
            <span className={styles.userId}>{user.identificador}</span>
          </div>

        </div>

        {showProfileModal && (
          <ProfileModal onStartLogout={onStartLogout} className={fadingOut ? "fadeOut" : "fadeIn"} />
        )}
      </div>
    </nav>
  );
}
