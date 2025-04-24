import { useEffect, useState } from 'react';
import styles from './FeatureStack.module.css';
import ProjectCard from './ProjectCard/projectCard';
import TaskCard from "./TaskCard/taskCard";
import MessageCard from './MessageCard/messageCard';


const temas = [
  {
    titulo: 'Gestão de Projetos',
    descricao: 'Organiza os teus projetos com estrutura clara, equipa colaborativa e tarefas bem definidas.',
    label: 'Projeto',
  },
  {
    titulo: 'Tarefas & Prazos',
    descricao: 'Acompanha as tuas tarefas com prazos definidos, responsáveis atribuídos e progresso visível.',
    label: 'Tarefa',
  },
  {
    titulo: 'Comunicação Eficiente',
    descricao: 'Centraliza a comunicação da equipa por tópicos e canais organizados dentro da plataforma.',
    label: 'Mensagem',
  },
];

export default function FeatureStack() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndex((prev) => (prev + 1) % temas.length);
    }, 9000); // muda de card a cada 4s

    return () => clearInterval(intervalo);
  }, []);

  const temaAtual = temas[index];

  return (
    <div className={styles.sectionContainer}>
      {/* Lado Esquerdo */}
      <div className={styles.textoEsquerdo}>
        <h2 className={styles.titulo}>{temaAtual.titulo}</h2>
        <p className={styles.descricao}>{temaAtual.descricao}</p>
      </div>

      {/* Lado Direito com Carrossel */}
      <div className={styles.cardsDireita}>
        <div
          className={styles.carousel}
          style={{ transform: `rotateY(${index * -120}deg)` }}
        >
          {temas.map((tema, i) => (
            <div key={i} className={styles.card}>
                {index === i && (
                {
                    Projeto: <ProjectCard />,
                    Tarefa: <TaskCard />,
                    Mensagem: <MessageCard /> // se já estiver implementado
                }[tema.label] || <span>{tema.label}</span>
                )}
            </div>
            ))}
        </div>
      </div>
    </div>
  );
}
