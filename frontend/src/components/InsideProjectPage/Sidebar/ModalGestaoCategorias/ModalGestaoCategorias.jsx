// ModalGestaoCategorias.jsx
import { useEffect, useState } from 'react';
import styles from './ModalGestaoCategorias.module.css';
import { arquivarCategoria, desarquivarCategoria, arquivarTopico, desarquivarTopico } from '../../../../services/api';
import { useAlert } from '../../../../context/AlertContext';

export default function ModalGestaoCategorias({ categorias, onClose, mostrarArquivadas, setMostrarArquivadas, projetoId }) {
  const [modoFiltro, setModoFiltro] = useState('tudo'); // 'tudo' | 'categorias' | 'topicos'
  const [renderKey, setRenderKey] = useState(Date.now());
  const { showAlert } = useAlert();

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  useEffect(() => {
    setRenderKey(Date.now());
  }, [categorias]);

  const alternarArquivamentoCategoria = async (categoria) => {
    try {
      const resposta = categoria.isArchived
        ? await desarquivarCategoria(categoria._id)
        : await arquivarCategoria(categoria._id);

      if (resposta.sucesso) {
        showAlert(`Categoria ${categoria.isArchived ? 'desarquivada' : 'arquivada'} com sucesso.`, 'sucesso');
      }
    } catch (error) {
      console.error("Erro ao alternar arquivamento da categoria:", error);
      showAlert('Erro ao atualizar categoria.', 'erro');
    }
  };

  const alternarArquivamentoTopico = async (topicoId, isAtualmenteArquivado) => {
    try {
      const resposta = isAtualmenteArquivado
        ? await desarquivarTopico(topicoId, projetoId)
        : await arquivarTopico(topicoId, projetoId);

      if (resposta.sucesso) {
        showAlert(`Tópico ${isAtualmenteArquivado ? 'desarquivado' : 'arquivado'} com sucesso.`, 'sucesso');
      }
    } catch (error) {
      console.error("Erro ao alternar arquivamento do tópico:", error);
      showAlert('Erro ao atualizar tópico.', 'erro');
    }
  };

  const handleToggleTopico = (topicoId, categoriaId) => {
    if (!Array.isArray(categorias)) return;

    const categoria = categorias.find(c => c._id === categoriaId);
    const topico = categoria?.topicos.find(t => t._id === topicoId);
    if (topico) {
      alternarArquivamentoTopico(topico._id, topico.isArchived);
    }
  };

  const categoriasFiltradas = Array.isArray(categorias)
    ? categorias.filter(cat => {
        if (modoFiltro === 'categorias') return cat.isArchived;
        return true;
      })
    : [];

  const topicosArquivados = (Array.isArray(categorias) ? categorias : [])
    .flatMap(cat => cat.topicos.map(topico => ({
      ...topico,
      categoriaId: cat._id,
      categoriaNome: cat.nome
    })))
    .filter(t => t.isArchived);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Gestão de Categorias</h2>
          <button className={styles.fecharBtn} onClick={onClose}>✖</button>
        </div>

        <div className={styles.filtros}>
          <button onClick={() => setModoFiltro('tudo')} className={modoFiltro === 'tudo' ? styles.ativo : ''}>📋 Ver tudo</button>
          <button onClick={() => setModoFiltro('categorias')} className={modoFiltro === 'categorias' ? styles.ativo : ''}>📦 Categorias arquivadas</button>
          <button onClick={() => setModoFiltro('topicos')} className={modoFiltro === 'topicos' ? styles.ativo : ''}>🗃️ Tópicos arquivados</button>
        </div>

        <div key={renderKey}>
          {modoFiltro === 'topicos' ? (
            <div className={styles.listaCategorias}>
              {topicosArquivados.map(topico => (
                <div
                  key={topico._id}
                  className={`${styles.topicoItem} ${topico.isArchived ? styles.arquivado : ''}`}
                  onDoubleClick={() => handleToggleTopico(topico._id, topico.categoriaId)}
                  title="Duplo clique para alternar arquivamento"
                >
                  {topico.isArchived && <span className={styles.iconArquivo}>🗃️</span>}
                  {topico.titulo} <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: '#888' }}>({topico.categoriaNome})</span>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.listaCategorias}>
              {categoriasFiltradas.map(cat => (
                <div key={cat._id} className={styles.cardCategoria}>
                  <div className={styles.cabecalhoCategoria}>
                    <span className={styles.nomeCategoria}>{cat.nome}</span>
                    <label className={styles.switch}>
                      <input type="checkbox" checked={!cat.isArchived} onChange={() => alternarArquivamentoCategoria(cat)} />
                      <span className={styles.slider}></span>
                    </label>
                  </div>

                  <ul className={styles.listaTopicos}>
                    {Array.isArray(cat.topicos) && cat.topicos.map(topico => (
                      <li
                        key={topico._id}
                        className={`${styles.topicoItem} ${topico.isArchived ? styles.arquivado : ''}`}
                        onDoubleClick={() => handleToggleTopico(topico._id, cat._id)}
                        title="Duplo clique para alternar arquivamento"
                      >
                        {topico.isArchived && <span className={styles.iconArquivo}>🗃️</span>}
                        {topico.titulo}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
