// InsideSidebar.jsx
import { useState, useEffect, useRef } from 'react';
import styles from './InsideSidebar.module.css';
import { useAlert } from '../../../context/AlertContext';
import {
  FaAngleDown, FaAngleUp, FaPlus, FaTrash, FaCogs, FaEllipsisV
} from 'react-icons/fa';
import {
  criarTopico,
  criarCategoria,
  atualizarCategoria,
  atualizarTopico,
  apagarCategoria,
  arquivarCategoria,
  arquivarTopico,
  apagarTopico
} from '../../../services/api';
import ModalGestaoCategorias from './ModalGestaoCategorias/ModalGestaoCategorias';


export default function InsideSidebar({
  projeto,
  projetoNome,
  categorias,
  setCategorias,
  selectedCategoria,
  setSelectedCategoria,
  selectedTopico,
  setSelectedTopico
}) {
  const [expandedCategoria, setExpandedCategoria] = useState(null);
  const [topicosTemp, setTopicosTemp] = useState({});
  const [novaCategoriaNome, setNovaCategoriaNome] = useState('');
  const [isCriandoCategoria, setIsCriandoCategoria] = useState(false);
  const [activeMenuCategoriaId, setActiveMenuCategoriaId] = useState(null);
  const [activeMenuTopicoId, setActiveMenuTopicoId] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [categoriaEmEdicao, setCategoriaEmEdicao] = useState(null);
  const [novoNomeCategoria, setNovoNomeCategoria] = useState('');
  const [topicoEmEdicaoId, setTopicoEmEdicaoId] = useState(null);
  const [novoNomeTopico, setNovoNomeTopico] = useState('');
  const { showAlert, showConfirm } = useAlert();
  const [mostrarModalGestao, setMostrarModalGestao] = useState(false);
  const [mostrarArquivadas, setMostrarArquivadas] = useState(false);


  const dropdownCategoriaRef = useRef(null);
  const dropdownTopicoRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      const clickedOutsideCategoria = dropdownCategoriaRef.current && !dropdownCategoriaRef.current.contains(e.target);
      const clickedOutsideTopico = dropdownTopicoRef.current && !dropdownTopicoRef.current.contains(e.target);
      if (clickedOutsideCategoria && clickedOutsideTopico) {
        setActiveMenuCategoriaId(null);
        setActiveMenuTopicoId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleCategoria = (categoriaId) => {
    setExpandedCategoria(expandedCategoria === categoriaId ? null : categoriaId);
  };

  const getColorForCategoria = (index) => {
    const cores = ['#00ffd5', '#ff6b6b', '#feca57', '#5f27cd', '#1dd1a1'];
    return cores[index % cores.length];
  };

  const handleRenameCategoria = (id) => {
    const categoria = categorias.find(c => c._id === id);
    setCategoriaEmEdicao(id);
    setNovoNomeCategoria(categoria.nome);
    setActiveMenuCategoriaId(null);
  };

  const confirmarRenomeCategoria = async () => {
    const novoNome = novoNomeCategoria.trim();
    if (!novoNome) return showAlert('O nome da categoria não pode estar vazio.', 'erro');

    const existe = categorias.some(c => c.nome.toLowerCase() === novoNome.toLowerCase() && c._id !== categoriaEmEdicao);
    if (existe) return showAlert('Já existe uma categoria com esse nome.', 'erro');

    try {
      const resposta = await atualizarCategoria(categoriaEmEdicao, { nome: novoNome });
      if (resposta?.sucesso) {
        const novasCategorias = categorias.map(c =>
          c._id === categoriaEmEdicao ? { ...c, nome: novoNome } : c
        );
        setCategorias(novasCategorias);
        setCategoriaEmEdicao(null);
        showAlert('Categoria atualizada com sucesso.', 'sucesso');
      } else {
        showAlert(resposta?.mensagem || 'Erro ao atualizar.', 'erro');
      }
    } catch (e) {
      showAlert('Erro ao comunicar com o servidor.', 'erro');
    }
  };

  const handleRenameTopico = (topicoId) => {
    const topicoAtual = categorias.flatMap(c => c.topicos).find(t => t._id === topicoId);
    setTopicoEmEdicaoId(topicoId);
    setNovoNomeTopico(topicoAtual?.titulo || '');
    setActiveMenuTopicoId(null);
  };

  const confirmarRenomeTopico = async (categoriaId) => {
    const novoNome = novoNomeTopico.trim();
    if (!novoNome) return showAlert('O nome do tópico não pode estar vazio.', 'erro');

    const categoria = categorias.find(c => c._id === categoriaId);
    const existe = categoria.topicos.some(t => t.titulo.toLowerCase() === novoNome.toLowerCase() && t._id !== topicoEmEdicaoId);
    if (existe) return showAlert('Já existe um tópico com esse nome.', 'erro');

    try {
      const resposta = await atualizarTopico(topicoEmEdicaoId, {
        titulo: novoNome,
        idProjeto: projeto._id
      });

      if (resposta?.sucesso) {
        const novasCategorias = categorias.map(c => {
          if (c._id !== categoriaId) return c;
          return {
            ...c,
            topicos: c.topicos.map(t =>
              t._id === topicoEmEdicaoId ? { ...t, titulo: novoNome } : t
            )
          };
        });

        setCategorias(novasCategorias);
        setTopicoEmEdicaoId(null);
        showAlert('Tópico atualizado com sucesso.', 'sucesso');
      } else {
        showAlert(resposta?.mensagem || 'Erro ao atualizar tópico.', 'erro');
      }
    } catch (e) {
      showAlert('Erro ao comunicar com o servidor.', 'erro');
    }
  };

  const handleDeleteCategoria = (idCategoria) => {
    const categoria = categorias.find(c => c._id === idCategoria);
    if (!categoria) return;

    if (categoria.topicos.length > 0) {
      return showAlert('Não podes eliminar uma categoria que contém tópicos.', 'erro');
    }

    showConfirm(
      `Tens a certeza que queres eliminar a categoria "${categoria.nome}"?`,
      async () => {
        try {
          const resposta = await apagarCategoria(idCategoria);
          if (resposta.sucesso) {
            const novasCategorias = categorias.filter(c => c._id !== idCategoria);
            setCategorias(novasCategorias);
            showAlert('Categoria eliminada com sucesso.', 'sucesso');
          } else {
            showAlert(resposta.mensagem || 'Erro ao eliminar categoria.', 'erro');
          }
        } catch (erro) {
          showAlert('Erro ao comunicar com o servidor.', 'erro');
        }
      },
      () => {
        showAlert('Eliminação cancelada.', 'erro');
      }
    );
  };

  const handleDeleteTopico = (topicoId, categoriaId) => {
    const categoria = categorias.find(c => c._id === categoriaId);
    if (!categoria) return;
  
    const topico = categoria.topicos.find(t => t._id === topicoId);
    if (!topico) return;
  
    const temMensagens = Array.isArray(topico.listaMensagens) && topico.listaMensagens.length > 0;
    const temTarefas = Array.isArray(topico.listaTarefas) && topico.listaTarefas.length > 0;
  
    if (temMensagens || temTarefas) {
      return showAlert('Não podes eliminar um tópico com mensagens ou tarefas.', 'erro');
    }
  
    showConfirm(
      `Tens a certeza que queres eliminar o tópico "${topico.titulo}"?`,
      async () => {
        try {
          const resposta = await apagarTopico(topicoId);
          if (resposta.sucesso) {
            const novasCategorias = categorias.map(c => {
              if (c._id !== categoriaId) return c;
              return {
                ...c,
                topicos: c.topicos.filter(t => t._id !== topicoId)
              };
            });
            setCategorias(novasCategorias);
            showAlert('Tópico eliminado com sucesso.', 'sucesso');
          } else {
            showAlert(resposta.mensagem || 'Erro ao eliminar tópico.', 'erro');
          }
        } catch (erro) {
          showAlert(erro.mensagem || 'Erro ao comunicar com o servidor.', 'erro');
        }
      },
      () => {
        showAlert('Eliminação cancelada.', 'erro');
      }
    );
  };
  

  const handleArquivarCategoria = async (categoriaId) => {
    const categoria = categorias.find(c => c._id === categoriaId);
    if (!categoria) return;

    showConfirm(
      `Queres arquivar a categoria "${categoria.nome}"? Os tópicos também serão arquivados.`,
      async () => {
        try {
          const resposta = await arquivarCategoria(categoriaId);
          if (resposta.sucesso) {
            const novasCategorias = categorias.map(c =>
              c._id === categoriaId ? { ...c, isArchived: true } : c
            );
            setCategorias(novasCategorias);
            showAlert('Categoria arquivada com sucesso.', 'sucesso');
          } else {
            showAlert(resposta.mensagem || 'Erro ao arquivar categoria.', 'erro');
          }
        } catch (erro) {
          showAlert('Erro ao comunicar com o servidor.', 'erro');
        }
      }
    );
  };

  const handleArquivarTopico = async (topicoId, categoriaId) => {
    const topico = categorias
      .flatMap(c => c.topicos)
      .find(t => t._id === topicoId);
    if (!topico) return;

    showConfirm(
      `Queres arquivar o tópico "${topico.titulo}"?`,
      async () => {
        try {
          const resposta = await arquivarTopico(topicoId, projeto._id);
          if (resposta.sucesso) {
            const novasCategorias = categorias.map(c => {
              if (c._id !== categoriaId) return c;
              return {
                ...c,
                topicos: c.topicos.map(t =>
                  t._id === topicoId ? { ...t, isArchived: true } : t
                )
              };
            });
            setCategorias(novasCategorias);
            showAlert('Tópico arquivado com sucesso.', 'sucesso');
          } else {
            showAlert(resposta.mensagem || 'Erro ao arquivar tópico.', 'erro');
          }
        } catch (erro) {
          showAlert('Erro ao comunicar com o servidor.', 'erro');
        }
      }
    );
  };

  const handleAddTopico = (categoriaId) => {
    setTopicosTemp(prev => ({
      ...prev,
      [categoriaId]: [...(prev[categoriaId] || []), {
        _id: `temp-${Date.now()}`,
        titulo: '',
        isEditing: true
      }]
    }));
  };

  return (
    <div className={styles.sidebar}>
      <h2 className={styles.projectTitle}>{projetoNome}</h2>
      <p className={styles.sectionLabel}>Categorias</p>

      <div className={styles.scrollable}>
      {Array.isArray(categorias) && categorias
        .filter(c => !c.isArchived)
        .map((categoria, index) => (
          <div key={categoria._id} className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.categoriaInfo} onClick={() => {
                setSelectedCategoria(categoria);
                toggleCategoria(categoria._id);
              }}>
                <span
                  className={styles.colorDot}
                  style={{ backgroundColor: getColorForCategoria(index) }}
                ></span>

                {categoriaEmEdicao === categoria._id ? (
                  <input
                    className={styles.topicoInput}
                    value={novoNomeCategoria}
                    onChange={(e) => setNovoNomeCategoria(e.target.value)}
                    onBlur={confirmarRenomeCategoria}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') confirmarRenomeCategoria();
                    }}
                    autoFocus
                  />
                ) : (
                  <span className={styles.nomeCategoria}>{categoria.nome}</span>
                )}
              </div>

              <div className={styles.iconActions}>
                <FaEllipsisV
                  className={styles.ellipsisIcon}
                  onClick={(e) => {
                    e.stopPropagation();
                    const rect = e.currentTarget.getBoundingClientRect();
                    setMenuPosition({ top: rect.top + window.scrollY, left: rect.right });
                    setActiveMenuCategoriaId(activeMenuCategoriaId === categoria._id ? null : categoria._id);
                  }}
                />
                {expandedCategoria === categoria._id
                  ? <FaAngleUp onClick={() => toggleCategoria(categoria._id)} />
                  : <FaAngleDown onClick={() => toggleCategoria(categoria._id)} />}
              </div>
            </div>

            {activeMenuCategoriaId === categoria._id && (
              <div
                className={styles.dropdownMenu}
                ref={dropdownCategoriaRef}
                style={{ top: `${menuPosition.top}px`, left: `${menuPosition.left}px` }}
              >
                <div onClick={() => handleRenameCategoria(categoria._id)}>📝 Renomear</div>
                <div onClick={() => handleArquivarCategoria(categoria._id)}>📦 Arquivar</div>
                <div onClick={() => handleDeleteCategoria(categoria._id)}>🗑️ Eliminar</div>
              </div>
            )}

            {expandedCategoria === categoria._id && (
              <div className={styles.topicoList}>
                {categoria.topicos.filter(t => !t.isArchived).map(topico => (
                  <div key={topico._id} className={styles.topicoItemWrapper}>
                    <div
                      className={`${styles.topicoItem} ${selectedTopico?._id === topico._id ? styles.activeTopico : ''}`}
                      onClick={() => setSelectedTopico(topico)}
                    >
                      {topicoEmEdicaoId === topico._id ? (
                        <input
                          className={styles.topicoInput}
                          value={novoNomeTopico}
                          onChange={(e) => setNovoNomeTopico(e.target.value)}
                          onBlur={() => confirmarRenomeTopico(categoria._id)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') confirmarRenomeTopico(categoria._id);
                          }}
                          autoFocus
                        />
                      ) : (
                        <span className={styles.nomeTopico}>● {topico.titulo}</span>
                      )}
                      <FaEllipsisV
                        className={styles.ellipsisIcon}
                        onClick={(e) => {
                          e.stopPropagation();
                          const rect = e.currentTarget.getBoundingClientRect();
                          setMenuPosition({ top: rect.top + window.scrollY, left: rect.right });
                          setActiveMenuTopicoId(activeMenuTopicoId === topico._id ? null : topico._id);
                        }}
                      />
                    </div>

                    {activeMenuTopicoId === topico._id && (
                      <div
                        className={styles.dropdownMenu}
                        ref={dropdownTopicoRef}
                        style={{ top: `${menuPosition.top}px`, left: `${menuPosition.left}px` }}
                      >
                        <div onClick={() => handleRenameTopico(topico._id)}>📝 Renomear</div>
                        <div onClick={() => handleArquivarTopico(topico._id, categoria._id)}>📦 Arquivar</div>
                        <div onClick={() => handleDeleteTopico(topico._id, categoria._id)}>🗑️ Eliminar</div>
                      </div>
                    )}
                  </div>
                ))}

{topicosTemp[categoria._id]?.map((topico, index) => (
  <div key={`temp-${categoria._id}-${index}`} className={styles.topicoItemWrapper}>

                    <input
                    className={styles.topicoInput}
                    value={topico.titulo}
                    onChange={(e) => {
                        setTopicosTemp(prev => ({
                        ...prev,
                        [categoria._id]: prev[categoria._id].map(t =>
                            t._id === topico._id ? { ...t, titulo: e.target.value } : t
                        )
                        }));
                    }}
                    onBlur={() => {
                        const valor = topico.titulo.trim();
                        if (!valor) {
                        setTopicosTemp(prev => ({
                            ...prev,
                            [categoria._id]: prev[categoria._id].filter(t => t._id !== topico._id)
                        }));
                        return;
                        }

                        criarTopico({
                        titulo: valor,
                        descricao: '',
                        idCategoria: categoria._id,
                        idProjeto: projeto._id
                        }).then(() => {
                        setTopicosTemp(prev => ({
                            ...prev,
                            [categoria._id]: prev[categoria._id].filter(t => t._id !== topico._id)
                        }));
                        });
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') e.target.blur();
                    }}
                    autoFocus
                    />
                </div>
                ))}

                <button
                  className={styles.addTopicButton}
                  onClick={() => handleAddTopico(categoria._id)}
                >
                  <FaPlus className={styles.addIcon} /> Adicionar tópico
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className={styles.acoesInferiores}>
        <button className={styles.botaoGestao} title="Gerir categorias" onClick={() => setMostrarModalGestao(true)}>
          <FaCogs />
        </button>
        <button
          className={styles.botaoNovaCategoria}
          onClick={() => setIsCriandoCategoria(true)}
        >
          <FaPlus /> Nova Categoria
        </button>
      </div>

      {mostrarModalGestao && (
        <ModalGestaoCategorias
            projetoId={projeto._id}
            categorias={categorias}
            setCategorias={setCategorias}
            onClose={() => setMostrarModalGestao(false)}
            mostrarArquivadas={mostrarArquivadas}
            setMostrarArquivadas={setMostrarArquivadas}
        />
        )}

      {isCriandoCategoria && (
        <input
          className={styles.inputNovaCategoria}
          placeholder="Nome da nova categoria"
          value={novaCategoriaNome}
          onChange={(e) => setNovaCategoriaNome(e.target.value)}
          onBlur={() => setIsCriandoCategoria(false)}
          onKeyDown={async (e) => {
            if (e.key === 'Enter' && novaCategoriaNome.trim()) {
              try {
                await criarCategoria({
                  nome: novaCategoriaNome.trim(),
                  descricao: '',
                  idProjeto: projeto._id
                });
                setNovaCategoriaNome('');
                setIsCriandoCategoria(false);
              } catch (error) {
                alert(error.mensagem || 'Erro ao criar categoria.');
              }
            }
          }}
          autoFocus
        />
      )}
    </div>
  );
}
