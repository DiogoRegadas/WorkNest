// src/components/InsideProjectPage/Chat/DropdownSugestoes/DropdownSugestoes.jsx

import { useEffect, useState } from 'react';
import styles from './DropdownSugestoes.module.css';

export default function DropdownSugestoes({
  modoComando,
  textoComando,
  categorias,
  categoriaAtual,
  utilizadores,
  onSelecionarSugestao
}) {
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [opcoes, setOpcoes] = useState([]);

  useEffect(() => {
    let novasOpcoes = [];

    if (modoComando === 'CAT_TOP') {
      novasOpcoes = ['/CAT — Categorias', '/TOP — Tópicos'];
    } else if (modoComando === 'CAT') {
      novasOpcoes = categorias.map(cat => `/CAT.${cat.nome}`);
    } else if (modoComando === 'TOP' && categoriaAtual?.topicos) {
      novasOpcoes = categoriaAtual.topicos.map(top => `/TOP.${top.titulo}`);
    } else if (modoComando === 'USER') {
      novasOpcoes = utilizadores.map(user => `@${user.firstName}${user.lastName}`);
    }

    setOpcoes(novasOpcoes);
    setHighlightedIndex(0);
  }, [modoComando, textoComando, categorias, categoriaAtual, utilizadores]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(prev => (prev + 1) % opcoes.length);
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(prev => (prev - 1 + opcoes.length) % opcoes.length);
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      if (opcoes[highlightedIndex]) {
        onSelecionarSugestao(opcoes[highlightedIndex]);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  });

  if (!opcoes.length) return null;

  return (
    <div className={styles.dropdown}>
      {opcoes.map((item, i) => (
        <div
          key={i}
          className={`${styles.item} ${i === highlightedIndex ? styles.active : ''}`}
          onClick={() => onSelecionarSugestao(item)}
        >
          {item}
        </div>
      ))}
    </div>
  );
}
