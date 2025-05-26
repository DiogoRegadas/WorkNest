// src/hooks/useTopicKey.js
import { useState, useEffect } from 'react';

export default function useTopicKey(topicId) {
  const [chave, setChave] = useState('');

  useEffect(() => {
    if (!topicId) return;
    const chaveGuardada = localStorage.getItem(`chave-topico-${topicId}`);
    if (chaveGuardada) {
      setChave(chaveGuardada);
    }
  }, [topicId]);

  const guardarChave = (novaChave) => {
    if (!topicId || !novaChave) return;
    localStorage.setItem(`chave-topico-${topicId}`, novaChave);
    setChave(novaChave);
  };

  const removerChave = () => {
    if (!topicId) return;
    localStorage.removeItem(`chave-topico-${topicId}`);
    setChave('');
  };

  return { chave, guardarChave, removerChave };
}
