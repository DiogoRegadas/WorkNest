
const ProjetoModel = require('../models/classes/projectModel');
const Projeto = require('../models/mongoose/projectMongo');
const CategoriaService = require('./categoriaServices');
const EventoService = require('./eventoServices');

const criarProjeto = async (dados) => {
  try {
    const novoProjeto = new ProjetoModel(dados.nome, dados.descricao, dados.owner);

    // Primeiro criar o Projeto SEM categorias
    const projetoMongo = new Projeto({
      nome: novoProjeto.nome,
      descricao: novoProjeto.descricao,
      deadline: dados.deadline, // 👈 já aceitaste o deadline
      owner: novoProjeto.owner,
      listaUtilizadores: [],
      listaCategorias: []
    });

    await projetoMongo.save();
    console.log('ID DO PROJETO - ', projetoMongo._id);

    const categoriasCriadas = [];

    if (dados.categorias && dados.categorias.length > 0) {
      for (const categoriaNome of dados.categorias) {
        const novaCategoria = {
          nome: categoriaNome,
          descricao: '',
          idProjeto: projetoMongo._id
        };
        const resultadoCategoria = await CategoriaService.criarCategoria(novaCategoria);
        if (resultadoCategoria.status === 201) {
          categoriasCriadas.push(resultadoCategoria.resposta.categoria._id);
        }
      }

      projetoMongo.listaCategorias = categoriasCriadas;
      await projetoMongo.save();
    }

    // ✅ Criar evento de deadline se existir
    if (dados.deadline) {
      await EventoService.criarEvento({
        tipo: 'projeto',
        referenciaId: projetoMongo._id,
        nome: `Deadline: ${dados.nome}`,
        data: dados.deadline,
        idProjeto: projetoMongo._id
      });
    }

    const projetoFinal = await Projeto.findById(projetoMongo._id)
      .populate('listaCategorias', 'nome descricao')
      .populate('owner', 'nome email');

    return {
      status: 201,
      resposta: { sucesso: true, mensagem: 'Projeto criado com sucesso.', projeto: projetoFinal }
    };
  } catch (error) {
    console.error("❌ Erro no serviço ao criar projeto:", error);
    return {
      status: 500,
      resposta: { sucesso: false, mensagem: 'Erro ao criar projeto.' }
    };
  }
};

const listarProjetos = async (idUser) => {
    const projetos = await Projeto.find({
      $or: [
        { owner: idUser },
        { listaUtilizadores: idUser }
      ]
    }).populate('owner', 'firstName lastName email');

    //console.log(JSON.stringify(projetos, null, 2));

    return { sucesso: true, projetos };
};

const obterProjetoPorId = async (id) => {
    try {
      const projeto = await Projeto.findById(id).populate('owner', 'firstName lastName email');
      if (!projeto) {
        return {
          status: 404,
          resposta: { sucesso: false, mensagem: 'Projeto não encontrado.' }
        };
      }
      return {
        status: 200,
        resposta: { sucesso: true, projeto }
      };
    } catch (error) {
      console.error("❌ Erro ao obter projeto:", error);
      return {
        status: 500,
        resposta: { sucesso: false, mensagem: 'Erro ao obter projeto.' }
      };
    }
  };

const atualizarProjeto = async (id, dados) => {
    try {
        const projeto = await Projeto.findByIdAndUpdate(id, dados, { new: true });
        if (!projeto) {
            return {
                status: 404,
                resposta: { sucesso: false, mensagem: 'Projeto não encontrado.' }
            };
        }
        return {
            status: 200,
            resposta: { sucesso: true, mensagem: 'Projeto atualizado com sucesso.', projeto }
        };
    } catch (error) {
        console.error("❌ Erro ao atualizar projeto:", error);
        return {
            status: 500,
            resposta: { sucesso: false, mensagem: 'Erro ao atualizar projeto.' }
        };
    }
};

const apagarProjeto = async (id) => {
    try {
        const projeto = await Projeto.findByIdAndDelete(id);
        if (!projeto) {
            return {
                status: 404,
                resposta: { sucesso: false, mensagem: 'Projeto não encontrado.' }
            };
        }
        return {
            status: 200,
            resposta: { sucesso: true, mensagem: 'Projeto apagado com sucesso.' }
        };
    } catch (error) {
        console.error("❌ Erro ao apagar projeto:", error);
        return {
            status: 500,
            resposta: { sucesso: false, mensagem: 'Erro ao apagar projeto.' }
        };
    }
};

const obterProjetoCompletoPorId = async (idProjeto) => {
  try {
    const projeto = await Projeto.findById(idProjeto)
      .populate('owner', 'firstName lastName')
      .populate('listaUtilizadores', 'firstName lastName');

    if (!projeto) {
      return {
        status: 404,
        resposta: { sucesso: false, mensagem: 'Projeto não encontrado.' }
      };
    }

    const categoriasComTopicos = [];
    for (const idCategoria of projeto.listaCategorias) {
      const categoria = await CategoriaService.obterCategoriaComTopicos(idCategoria);
      if (categoria) {
        categoriasComTopicos.push(categoria);
      }
    }

    console.log(`📁 Projeto: ${projeto.nome} (${projeto._id})`);

    if (Array.isArray(categoriasComTopicos)) {
      categoriasComTopicos.forEach((cat, index) => {
        console.log(`  📂 Categoria ${index + 1}: ${cat.nome} (${cat._id})`);

        if (Array.isArray(cat.topicos) && cat.topicos.length > 0) {
          cat.topicos.forEach((topico, i) => {
            console.log(`    📝 Tópico ${i + 1}: ${topico.titulo} (${topico._id})`);

            const numTarefas = Array.isArray(topico.listaTarefas) ? topico.listaTarefas.length : 0;
            const numMensagens = Array.isArray(topico.listaMensagens) ? topico.listaMensagens.length : 0;

            if (numTarefas > 0 || numMensagens > 0) {
              console.log(`      📌 Tarefas: ${numTarefas} | 💬 Mensagens: ${numMensagens}`);
            } else {
              console.log(`      ⚠️ Sem tarefas nem mensagens`);
            }
          });
        } else {
          console.log(`    ⚠️ Sem tópicos`);
        }
      });
    }

    return {
      status: 200,
      resposta: {
        sucesso: true,
        projeto: {
          _id: projeto._id,
          nome: projeto.nome,
          descricao: projeto.descricao,
          deadline: projeto.deadline,
          owner: projeto.owner,
          listaUtilizadores: projeto.listaUtilizadores, // ✅ Adicionado
          categorias: categoriasComTopicos
        }
      }
    };
  } catch (error) {
    console.error('❌ Erro ao obter projeto completo:', error);
    return {
      status: 500,
      resposta: { sucesso: false, mensagem: 'Erro ao obter projeto completo.' }
    };
  }
};

const removerColaborador = async (idProjeto, idUtilizador) => {
  try {
    const projeto = await Projeto.findById(idProjeto);
    if (!projeto) {
      return {
        status: 404,
        resposta: { sucesso: false, mensagem: 'Projeto não encontrado.' }
      };
    }

    projeto.listaUtilizadores = projeto.listaUtilizadores.filter(
      (uid) => uid.toString() !== idUtilizador
    );

    await projeto.save();

    // Emitir projeto atualizado via WebSocket
    const io = require('../socketServer').getIO();
    const resultadoProjeto = await module.exports.obterProjetoCompletoPorId(idProjeto);

    if (resultadoProjeto.status === 200 && resultadoProjeto.resposta?.projeto) {
      io.to(`projeto:${idProjeto}`).emit('projetoAtualizado', resultadoProjeto.resposta.projeto);
      console.log(`📢 Projeto atualizado emitido via WebSocket (colaborador removido).`);
    }

    return {
      status: 200,
      resposta: { sucesso: true, mensagem: 'Colaborador removido com sucesso.' }
    };

  } catch (erro) {
    console.error("❌ Erro ao remover colaborador:", erro);
    return {
      status: 500,
      resposta: { sucesso: false, mensagem: 'Erro ao remover colaborador.' }
    };
  }
};


const transferirOwner = async (idProjeto, novoOwnerId) => {
  const projeto = await Projeto.findById(idProjeto);
  if (!projeto) {
    return {
      status: 404,
      resposta: { sucesso: false, mensagem: 'Projeto não encontrado.' }
    };
  }

  if (!projeto.listaUtilizadores.includes(novoOwnerId)) {
    projeto.listaUtilizadores.push(novoOwnerId);
  }

  projeto.owner = novoOwnerId;
  await projeto.save();

  // Emitir projeto atualizado via WebSocket
  const io = require('../socketServer').getIO();
  const resultadoProjeto = await module.exports.obterProjetoCompletoPorId(idProjeto);

  if (resultadoProjeto.status === 200 && resultadoProjeto.resposta?.projeto) {
    io.to(`projeto:${idProjeto}`).emit('projetoAtualizado', resultadoProjeto.resposta.projeto);
    console.log(`📢 Projeto atualizado emitido via WebSocket (transferência de owner).`);
  }

  return {
    status: 200,
    resposta: { sucesso: true, mensagem: 'Posse do projeto transferida com sucesso.' }
  };
};

const sairDoProjeto = async (idProjeto, idUtilizador) => {
  try {
    const projeto = await Projeto.findById(idProjeto);
    if (!projeto) {
      return {
        status: 404,
        resposta: { sucesso: false, mensagem: 'Projeto não encontrado.' }
      };
    }

    // Impedir que o owner saia diretamente (deve usar transferirEExcluir)
    if (projeto.owner.toString() === idUtilizador) {
      return {
        status: 400,
        resposta: { sucesso: false, mensagem: 'O owner deve transferir a posse antes de sair.' }
      };
    }

    projeto.listaUtilizadores = projeto.listaUtilizadores.filter(
      (uid) => uid.toString() !== idUtilizador
    );

    await projeto.save();

    // Emitir projeto atualizado
    const io = require('../socketServer').getIO();
    const resultadoProjeto = await module.exports.obterProjetoCompletoPorId(idProjeto);
    if (resultadoProjeto.status === 200 && resultadoProjeto.resposta?.projeto) {
      io.to(`projeto:${idProjeto}`).emit('projetoAtualizado', resultadoProjeto.resposta.projeto);
    }

    return {
      status: 200,
      resposta: { sucesso: true, mensagem: 'Saiu do projeto com sucesso.' }
    };
  } catch (erro) {
    console.error("❌ Erro ao sair do projeto:", erro);
    return {
      status: 500,
      resposta: { sucesso: false, mensagem: 'Erro ao sair do projeto.' }
    };
  }
};

const transferirEExcluir = async (idProjeto, novoOwnerId) => {
  try {
    const projeto = await Projeto.findById(idProjeto);
    if (!projeto) {
      return {
        status: 404,
        resposta: { sucesso: false, mensagem: 'Projeto não encontrado.' }
      };
    }

    const antigoOwnerId = projeto.owner.toString();

    // Garantir que o novo owner está na lista de utilizadores
    if (!projeto.listaUtilizadores.includes(novoOwnerId)) {
      projeto.listaUtilizadores.push(novoOwnerId);
    }

    // Atualizar owner
    projeto.owner = novoOwnerId;

    // Remover antigo owner da lista de utilizadores
    projeto.listaUtilizadores = projeto.listaUtilizadores.filter(
      (uid) => uid.toString() !== antigoOwnerId
    );

    await projeto.save();

    // Emitir atualização
    const io = require('../socketServer').getIO();
    const resultadoProjeto = await module.exports.obterProjetoCompletoPorId(idProjeto);
    if (resultadoProjeto.status === 200 && resultadoProjeto.resposta?.projeto) {
      io.to(`projeto:${idProjeto}`).emit('projetoAtualizado', resultadoProjeto.resposta.projeto);
    }

    return {
      status: 200,
      resposta: { sucesso: true, mensagem: 'Posse transferida e owner removido com sucesso.' }
    };
  } catch (erro) {
    console.error("❌ Erro ao transferir e sair:", erro);
    return {
      status: 500,
      resposta: { sucesso: false, mensagem: 'Erro ao transferir posse e sair do projeto.' }
    };
  }
};





module.exports = {
    criarProjeto,
    listarProjetos,
    obterProjetoPorId,
    atualizarProjeto,
    apagarProjeto,
    obterProjetoCompletoPorId,
    removerColaborador,
    transferirOwner,
    sairDoProjeto,
    transferirEExcluir
};
