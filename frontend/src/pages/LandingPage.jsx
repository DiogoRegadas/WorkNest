// frontend/src/pages/LandingPage.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';
//import projetosImg from '../assets/projetos.png';
//import equipaImg from '../assets/equipa.png';
//import tarefasImg from '../assets/tarefas.png';
//import calendarioImg from '../assets/calendario.png';

function LandingPage() {
    const navigate = useNavigate();
    const [showNavbar, setShowNavbar] = useState(false);
  
    useEffect(() => {
      const handleScroll = () => {
        setShowNavbar(window.scrollY > 100);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
  
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
  
    return (
      <div style={{ fontFamily: 'Poppins, sans-serif', margin: 0, padding: 0, overflowX: 'hidden' }}>
  
        {showNavbar && (
          <motion.div
            style={styles.navbar}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div style={styles.navLogo}>WorkNest</div>
  
            <motion.div
              style={styles.arrowContainer}
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              onClick={scrollToTop}
            >
              <span style={styles.arrow}>↑</span>
            </motion.div>
  
            <div>
              <button style={styles.navButton} onClick={() => navigate('/signin')}>Iniciar Sessão</button>
              <button style={styles.navButtonOutline} onClick={() => navigate('/signup')}>Criar Conta</button>
            </div>
          </motion.div>
        )}
  
        <section style={styles.heroSection}>
          <div style={styles.heroCenter}>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={styles.heroTitle}
            >WorkNest</motion.h1>
            <p style={styles.heroSubtitle}>A plataforma para equipas colaborativas e organizadas.</p>
            <div style={styles.buttonGroup}>
              <button style={styles.button} onClick={() => navigate('/signin')}>Iniciar Sessão</button>
              <button style={styles.buttonOutline} onClick={() => navigate('/signup')}>Criar Conta</button>
            </div>
          </div>
        </section>

      <motion.section id="projetos" style={styles.sectionSplitLight} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
        <div style={styles.splitContent}>
          <div>
            <h2 style={styles.sectionTitle}>🗂️ Gestão de Projetos</h2>
            <p style={styles.sectionText}>Cria e organiza projetos em categorias com tarefas associadas. Tudo acessível à tua equipa.</p>
          </div>
          <img src={logo} alt="Gestão de Projetos" style={styles.sectionImage} />
        </div>
      </motion.section>

      <motion.section id="equipa" style={styles.sectionSplitDark} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
        <div style={styles.splitContent}>
          <img src={logo} alt="Trabalho em Equipa" style={styles.sectionImage} />
          <div>
            <h2 style={styles.sectionTitle}>🤝 Trabalho em Equipa</h2>
            <p style={styles.sectionText}>Comunica com os membros da tua equipa em tempo real, por tópicos, com total clareza.</p>
          </div>
        </div>
      </motion.section>

      <motion.section id="tarefas" style={styles.sectionSplitBege} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
        <div style={styles.splitContent}>
          <div>
            <h2 style={styles.sectionTitle}>✅ Tarefas Organizadas</h2>
            <p style={styles.sectionText}>Define tarefas por tópicos, atribui responsáveis e segue o progresso facilmente.</p>
          </div>
          <img src={logo} alt="Tarefas" style={styles.sectionImage} />
        </div>
      </motion.section>

      <motion.section id="calendario" style={styles.sectionSplitAzulClaro} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
        <div style={styles.splitContent}>
          <img src={logo} alt="Calendário" style={styles.sectionImage} />
          <div>
            <h2 style={styles.sectionTitle}>📅 Cumpre os Prazos</h2>
            <p style={styles.sectionText}>Todos os prazos visíveis no calendário. Organiza o tempo e nunca te atrases.</p>
          </div>
        </div>
      </motion.section>

      <footer style={styles.footer}>Feito com ❤️ para estudantes e equipas criativas. © {new Date().getFullYear()} WorkNest</footer>
    </div>
  );
}

const sectionBase = {
  padding: '120px 40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh'
};

const styles = {
    navbar: {
        position: 'fixed',
        top: 20,
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#1f3546',
        color: 'white',
        padding: '14px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 1000,
        borderRadius: '50px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        minWidth: '60%',
        gap: '40px'
      },
      navLogo: { fontWeight: 'bold', fontSize: '1.3rem', flex: 1 },
      arrowContainer: {
        cursor: 'pointer',
        fontSize: '1.5rem',
        flex: 1,
        textAlign: 'center'
      },
      arrow: {
        display: 'inline-block',
        fontSize: '1.5rem',
        color: '#f97316'
      },
      navButton: {
        marginLeft: 10,
        padding: '8px 16px',
        backgroundColor: '#f97316',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        fontSize: '1rem',
        cursor: 'pointer'
      },
      navButtonOutline: {
        marginLeft: 10,
        padding: '8px 16px',
        backgroundColor: 'transparent',
        color: '#f97316',
        border: '2px solid #f97316',
        borderRadius: '6px',
        fontSize: '1rem',
        cursor: 'pointer'
      },
      heroSection: {
        backgroundColor: '#1f3546',
        color: 'white',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '0 20px'
      },
      heroCenter: {
        maxWidth: '800px'
      },
      heroTitle: { fontSize: '3.5rem', marginBottom: 20 },
      heroSubtitle: { fontSize: '1.3rem', color: '#d1d5db', marginBottom: 40 },
      buttonGroup: { display: 'flex', justifyContent: 'center', gap: 20, flexWrap: 'wrap' },
      button: {
        padding: '12px 24px',
        backgroundColor: '#f97316',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '1rem',
        cursor: 'pointer',
        fontWeight: '600'
      },
      buttonOutline: {
        padding: '12px 24px',
        backgroundColor: 'transparent',
        color: '#f97316',
        border: '2px solid #f97316',
        borderRadius: '8px',
        fontSize: '1rem',
        cursor: 'pointer',
        fontWeight: '600'
      },
  sectionSplitLight: {
    ...sectionBase,
    backgroundColor: '#f9fafb', color: '#1f2937'
  },
  sectionSplitDark: {
    ...sectionBase,
    backgroundColor: '#374151', color: 'white'
  },
  sectionSplitBege: {
    ...sectionBase,
    backgroundColor: '#f3e8d9', color: '#4b5563'
  },
  sectionSplitAzulClaro: {
    ...sectionBase,
    backgroundColor: '#dbeafe', color: '#1e3a8a'
  },
  sectionTitle: {
    fontSize: '2.4rem', marginBottom: '10px'
  },
  sectionText: {
    fontSize: '1.15rem', maxWidth: '600px', lineHeight: '1.6'
  },
  sectionImage: {
    width: '300px', height: 'auto', marginLeft: '40px'
  },
  splitContent: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1100px', gap: '40px', flexWrap: 'wrap'
  },
  footer: {
    padding: '30px', textAlign: 'center', backgroundColor: '#1f3546', color: 'white'
  }
};

export default LandingPage;
