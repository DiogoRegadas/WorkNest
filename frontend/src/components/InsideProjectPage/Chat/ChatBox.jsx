import { useState, useRef, useEffect } from 'react';
import styles from './ChatBox.module.css';
import { FaLock, FaLockOpen } from 'react-icons/fa';
import TopSelector from './TopSelector/TopSelector';
import DropdownSugestoes from './DropdownSugestoes/DropdownSugestoes';
import { enviarMensagemParaFirestore } from '../../../firebase/enviarMensagemFirestore'; 



export default function ChatBox({
  topico,
  setSelectedTopico,
  categoriaAtual,
  categorias,
  utilizadores,
  setSelectedCategoria
}) {
  const [mensagem, setMensagem] = useState('');
  const [modoComando, setModoComando] = useState(null);
  const [textoComando, setTextoComando] = useState('');
  const [modoTopSelector, setModoTopSelector] = useState('TOP');
  const [bloqueado, setBloqueado] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (modoComando && inputRef.current) {
      inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [modoComando]);


  const handleInputChange = (e) => {
    const value = e.target.value;
    setMensagem(value);

    const matchComando = value.match(/^([/@])([A-Za-z0-9._]*)$/);
    if (matchComando) {
      const prefixo = matchComando[1];
      const texto = matchComando[2];

      if (prefixo === '/') {
        setModoComando('CAT_TOP');
        setTextoComando(texto);
      } else if (prefixo === '@') {
        setModoComando('USER');
        setTextoComando(texto);
      }
    } else {
      setModoComando(null);
      setTextoComando('');
    }
  };

  const handleSelecionarSugestao = (sugestao) => {
    if (sugestao === '/CAT — Categorias') {
      setModoTopSelector('CAT');
      setMensagem('/CAT.');
    } else if (sugestao === '/TOP — Tópicos') {
      setModoTopSelector('TOP');
      setMensagem('/TOP.');
    } else if (sugestao.startsWith('/CAT.')) {
      setMensagem(sugestao);
      setModoTopSelector('CAT');
    } else if (sugestao.startsWith('/TOP.')) {
      setMensagem(sugestao);
      setModoTopSelector('TOP');
    } else if (sugestao.startsWith('@')) {
      setMensagem(sugestao);
    }

    setModoComando(null);
    setTextoComando('');
  };

  const toggleBloqueio = () => setBloqueado(prev => !prev);


  const handleEnviar = async () => {
    if (!mensagem.trim() || !topico) return;
  
    try {
      const utilizador = JSON.parse(localStorage.getItem('utilizador'));
      if (!utilizador || !utilizador.id) {
        console.error("Utilizador não encontrado no localStorage.");
        return;
      }
  
      await enviarMensagemParaFirestore({
        conteudo: mensagem.trim(),
        autorId: utilizador.id,
        topicoId: topico._id,
        encriptada: false, // ou true se tiver encriptação mais tarde
        meta: {
          nomeAutor: `${utilizador.firstName} ${utilizador.lastName}`
        }
      });
  
      setMensagem('');
      setModoComando(null);
      setTextoComando('');
    } catch (erro) {
      console.error("Erro ao enviar mensagem:", erro);
    }
  };
  

  
  return (
    <div className={styles.chatContainer}>
      <TopSelector
        modoTopSelector={modoTopSelector}
        categorias={categorias}
        categoriaAtual={categoriaAtual}
        topico={topico}
        setSelectedTopico={setSelectedTopico}
        setSelectedCategoria={setSelectedCategoria}
      />

      <div className={styles.mensagens}>
        <p className={styles.placeholder}>[Todas as mensagens vão aparecer aqui]</p>
      </div>

      <div className={styles.inputWrapper}>
        <div className={styles.inputArea} ref={inputRef}>
          <input
            type="text"
            placeholder="Escreve uma mensagem..."
            value={mensagem}
            onChange={handleInputChange}
            onKeyDown={(e) => e.key === 'Enter' && handleEnviar()}
          />
          <button onClick={handleEnviar}>Enviar</button>
        </div>

        <div className={styles.selectedInfoBox}>
          <div className={styles.infoText}>
            {categoriaAtual && (
              <span
                className={styles.dot}
                style={{ backgroundColor: categoriaAtual.cor || '#ccc', marginRight: '8px' }}
              />
            )}
            <span>
              <span className={categoriaAtual ? styles.valorSelecionado : styles.placeholderInfo}>
                {categoriaAtual?.nome || 'Categoria...'}
              </span>
            </span>
            <span className={styles.separator}>|</span>
            <span>
              <span className={topico ? styles.valorSelecionado : styles.placeholderInfo}>
                {topico?.titulo || 'Tópico...'}
              </span>
            </span>
          </div>
          <div className={styles.lockIcon} onClick={toggleBloqueio}>
            {bloqueado ? <FaLock /> : <FaLockOpen />}
          </div>
        </div>

        {modoComando && (
          <DropdownSugestoes
            modoComando={modoComando}
            textoComando={textoComando}
            categorias={categorias}
            categoriaAtual={categoriaAtual}
            utilizadores={utilizadores}
            onSelecionar={handleSelecionarSugestao}
          />
        )}
      </div>
    </div>
  );
}
