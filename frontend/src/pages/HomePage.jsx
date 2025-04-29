import styles from '../components/Home/Home.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Navbar from '../components/Home/Navbar/Navbar';
import Sidebar from '../components/Home/Sidebar/Sidebar';
import MainContent from '../components/Home/MainContent/MainContent';
import ExtraPanel from '../components/Home/ExtraPanel/ExtraPanel';

export default function HomePage() {

  const [selectedProject, setSelectedProject] = useState(null); // <- novo
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  const startLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      localStorage.removeItem("utilizador");
      localStorage.removeItem("token");
      navigate("/");
    }, 1000); // Igual à duração do fade
  };

  return (
    <div className={`${styles.homeContainer} ${isLoggingOut ? styles.fadeOut : ''}`}>
      <div className={styles.navbar}>
        <Navbar onStartLogout={startLogout} />
      </div>
      <div className={styles.content}>
        <div className={styles.sidebar}>
          <Sidebar />
        </div>
        <div className={styles.main}>
        <MainContent setSelectedProject={setSelectedProject} />
        </div>
        <div className={styles.extraPanel}>
        <ExtraPanel selectedProject={selectedProject} /> {/* passamos o selected */}
        </div>
      </div>
    </div>
  );
}
