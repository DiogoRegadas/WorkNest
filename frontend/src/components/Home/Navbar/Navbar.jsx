import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import ProfileModal from './ProfileModal/ProfileModal';

export default function Navbar({onStartLogout}) {
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
          <div className={styles.avatar}></div>
          <div className={styles.userName}>
            {user.firstName} {user.lastName}
          </div>
        </div>

        {showProfileModal && (
          <ProfileModal onStartLogout={onStartLogout} className={fadingOut ? "fadeOut" : "fadeIn"} />
        )}
      </div>
    </nav>
  );
}
