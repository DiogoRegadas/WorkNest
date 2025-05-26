// src/components/InsideProjectPage/Chat/TopSelector/TopSelector.jsx

import { useEffect, useState } from 'react';
import styles from './TopSelector.module.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function TopSelector({
  modoComando,
  categoriaAtual,
  categorias,
  topico,
  setSelectedTopico,
  setSelectedCategoria,
}) {
  const [indexAtivo, setIndexAtivo] = useState(0);

  const listaTopicos = categoriaAtual?.topicos || [];
  const listaCategorias = categorias || [];
  const mostrarTopicos = modoComando !== 'CAT';
  const mostrarCategorias = modoComando === 'CAT';

  useEffect(() => {
    if (mostrarTopicos && topico) {
      const index = listaTopicos.findIndex(t => t._id === topico._id);
      if (index >= 0) setIndexAtivo(index);
    }
  }, [topico, listaTopicos, mostrarTopicos]);

  const handleTrocar = (direcao) => {
    if (!mostrarTopicos || listaTopicos.length === 0) return;

    const novoIndex = (indexAtivo + direcao + listaTopicos.length) % listaTopicos.length;
    setIndexAtivo(novoIndex);
    setSelectedTopico(listaTopicos[novoIndex]);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!mostrarTopicos) return;

      if (e.key === 'ArrowLeft') handleTrocar(-1);
      if (e.key === 'ArrowRight') handleTrocar(1);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [indexAtivo, mostrarTopicos, listaTopicos]);

  return (
    <div className={styles.topBar}>
      {mostrarTopicos && (
        <button className={styles.arrowBtn} onClick={() => handleTrocar(-1)}>
          <FaChevronLeft />
        </button>
      )}

      <div className={styles.topicoListWrapper}>
        <div className={styles.topicoList}>
        {mostrarCategorias &&
            listaCategorias.map((cat) => (
                <div
                key={cat._id}
                className={styles.topicoBadge}
                onClick={() => setSelectedCategoria(cat)} // ADICIONA ISTO
                >
                <div className={styles.dot} style={{ backgroundColor: cat.cor || '#ccc' }} />
                {cat.nome}
                </div>
            ))}

          {mostrarTopicos &&
            listaTopicos.map((t, i) => (
              <div
                key={t._id}
                className={`${styles.topicoBadge} ${i === indexAtivo ? styles.selected : ''}`}
                onClick={() => {
                  setSelectedTopico(t);
                  setIndexAtivo(i);
                }}
              >
                <div className={styles.dot} style={{ backgroundColor: categoriaAtual?.cor || '#ccc' }} />
                {t.titulo}
              </div>
            ))}
        </div>
      </div>

      {mostrarTopicos && (
        <button className={styles.arrowBtn} onClick={() => handleTrocar(1)}>
          <FaChevronRight />
        </button>
      )}
    </div>
  );
}
