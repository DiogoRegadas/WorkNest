import styles from "./heroSection.module.css";
import { Button } from "../../ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function HeroSection() {
  const navigate = useNavigate();

  const tecnologias = [
    "React",
    "Node.js",
    "Express.js",
    "MongoDB",
    "JWT",
    "Mongoose",
    "TailwindCSS"
  ];

  return (
    <section className={styles.hero}>
      <motion.div
        className={styles.stat}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        🚀 Mais de 1.200 equipas já criaram o seu espaço de trabalho
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Plataforma de Colaboração para Equipas Modernas
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        Cria projetos, organiza tarefas, comunica com a tua equipa e cumpre prazos com o WorkNest.
      </motion.p>

      <motion.div
        className={styles.buttons}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <button onClick={() => navigate("/signup")}>Criar Conta</button>
        <button onClick={() => navigate("/signin")}>Iniciar Sessão</button>
      </motion.div>

      <motion.div
        className={styles.slider}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <div className={styles.sliderTrack}>
          {[...Array(100)].flatMap(() => tecnologias).map((tech, index) => (
            <div key={index} className={styles.sliderItem}>
              {tech}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
