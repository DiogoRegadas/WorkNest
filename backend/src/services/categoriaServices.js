const CategoriaModel = require('../models/classes/categoriaModel');
const Categoria = require('../models/mongoose/categoriaMongo');
const Topico = require('../models/mongoose/topicMongo');
const Projeto = require('../models/mongoose/projectMongo');
const Mensagem = require('../models/mongoose/mensagemMongo');
const Tarefa = require('../models/mongoose/tarefaMongo');
const ProjetoService = require('./projectServices');
const { getIO } = require('../socketServer');

const criarCategoria = async (dados) => {
    try {
        console.log("Dados recebidos para criar categoria:", dados);
        const novaCategoria = new CategoriaModel(dados.nome, dados.descricao, dados.idProjeto);

        const categoriaMongo = new Categoria({
            nome: novaCategoria.nome,
            descricao: novaCategoria.descricao,
            idProjeto: novaCategoria.idProjeto,
            cor: dados.cor || '#ffffff',
            listaTopicos: []
        });

        await categoriaMongo.save();

        await Projeto.findByIdAndUpdate(
            dados.idProjeto,
            { $push: { listaCategorias: categoriaMongo._id } },
            { new: true }
          );

          
          console.log('🔍 ProjetoService:', ProjetoService);

        const io = getIO();        
        // dentro da tua função criarCategoria
const resultadoProjeto = await require('./projectServices').obterProjetoCompletoPorId(dados.idProjeto);

        
        if (resultadoProjeto.status === 200 && resultadoProjeto.resposta?.projeto) {
            io.to(`projeto:${dados.idProjeto}`).emit('projetoAtualizado', resultadoProjeto.resposta.projeto);
            console.log(`📢 Projeto completo emitido via WebSocket para sala projeto:${dados.idProjeto}`);
        }
      

        return {
            status: 201,
            resposta: { sucesso: true, mensagem: 'Categoria criada com sucesso.', categoria: categoriaMongo }
        };
    } catch (error) {
        console.error("❌ Erro no serviço ao criar categoria:", error);
        return {
            status: 500,
            resposta: { sucesso: false, mensagem: 'Erro ao criar categoria.' }
        };
    }
};

const listarCategorias = async () => {
    const categorias = await Categoria.find().populate('idProjeto', 'nome');
    return { sucesso: true, categorias };
};

const obterCategoriaPorId = async (id) => {
    try {
        const categoria = await Categoria.findById(id).populate('idProjeto', 'nome');
        if (!categoria) {
            return {
                status: 404,
                resposta: { sucesso: false, mensagem: 'Categoria não encontrada.' }
            };
        }
        return {
            status: 200,
            resposta: { sucesso: true, categoria }
        };
    } catch (error) {
        console.error("❌ Erro ao obter categoria:", error);
        return {
            status: 500,
            resposta: { sucesso: false, mensagem: 'Erro ao obter categoria.' }
        };
    }
};

const atualizarCategoria = async (id, dados) => {
    try {
      const categoria = await Categoria.findByIdAndUpdate(id, dados, { new: true });
      if (!categoria) {
        return {
          status: 404,
          resposta: { sucesso: false, mensagem: 'Categoria não encontrada.' }
        };
      }
  
      const io = getIO();
  
      // 🔍 Garantir que temos sempre o id do projeto
      const idProjeto = dados.idProjeto || categoria.idProjeto;
  
      const resultadoProjeto = await require('./projectServices').obterProjetoCompletoPorId(idProjeto);
  
      if (resultadoProjeto.status === 200 && resultadoProjeto.resposta?.projeto) {
        io.to(`projeto:${idProjeto}`).emit('projetoAtualizado', resultadoProjeto.resposta.projeto);
        console.log(`📢 Projeto completo emitido via WebSocket para sala projeto:${idProjeto}`);
      }
  
      return {
        status: 200,
        resposta: { sucesso: true, mensagem: 'Categoria atualizada com sucesso.', categoria }
      };
    } catch (error) {
      console.error("❌ Erro ao atualizar categoria:", error);
      return {
        status: 500,
        resposta: { sucesso: false, mensagem: 'Erro ao atualizar categoria.' }
      };
    }
  };
  

  const apagarCategoria = async (id) => {
    try {
      const categoria = await Categoria.findById(id).populate('listaTopicos');
      if (!categoria) {
        return {
          status: 404,
          resposta: { sucesso: false, mensagem: 'Categoria não encontrada.' }
        };
      }
  
      if (categoria.listaTopicos.length > 0) {
        return {
          status: 400,
          resposta: { sucesso: false, mensagem: 'A categoria não pode ser eliminada porque contém tópicos.' }
        };
      }
  
      // Remove a categoria
      await Categoria.findByIdAndDelete(id);
  
      // Remove a referência da categoria do projeto
      await Projeto.findByIdAndUpdate(categoria.idProjeto, {
        $pull: { listaCategorias: categoria._id }
      });
  
      // Emitir atualização via WebSocket
      const io = getIO();
      const resultadoProjeto = await require('./projectServices').obterProjetoCompletoPorId(categoria.idProjeto);
  
      if (resultadoProjeto.status === 200 && resultadoProjeto.resposta?.projeto) {
        io.to(`projeto:${categoria.idProjeto}`).emit('projetoAtualizado', resultadoProjeto.resposta.projeto);
        console.log(`📢 Projeto atualizado emitido via WebSocket (categoria eliminada).`);
      }
  
      return {
        status: 200,
        resposta: { sucesso: true, mensagem: 'Categoria eliminada com sucesso.' }
      };
    } catch (error) {
      console.error("❌ Erro ao apagar categoria:", error);
      return {
        status: 500,
        resposta: { sucesso: false, mensagem: 'Erro ao apagar categoria.' }
      };
    }
  };

const obterCategoriaComTopicos = async (idCategoria) => {
    try {
      const categoria = await Categoria.findById(idCategoria)
      .populate({
        path: 'listaTopicos',
        populate: [
          { path: 'listaMensagens', select: '_id' },
          { path: 'listaTarefas', select: '_id' }
        ],
        select: 'titulo descricao isArchived listaMensagens listaTarefas'
      })

      //console.log("Categoria com tópicos:", categoria);
    
  
      if (!categoria) return null;
  
      return {
        _id: categoria._id,
        nome: categoria.nome,
        descricao: categoria.descricao,
        topicos: categoria.listaTopicos,
        isArchived: categoria.isArchived
      };
  
    } catch (error) {
      console.error("❌ Erro ao obter categoria com tópicos:", error);
      return null;
    }
  };

  const arquivarCategoria = async (id) => {

    try {
        console.log("ID da categoria a arquivar:", id);
        const categoria = await Categoria.findById(id);
        if (!categoria) {
          return { status: 404, resposta: { sucesso: false, mensagem: 'Categoria não encontrada.' } };
        }
      
        categoria.isArchived = true;
        await categoria.save();
      
        //await Topico.updateMany({ idCategoria: id }, { isArchived: true });
        const io = getIO();
          const resultadoProjeto = await require('./projectServices').obterProjetoCompletoPorId(categoria.idProjeto);
      
          if (resultadoProjeto.status === 200 && resultadoProjeto.resposta?.projeto) {
            io.to(`projeto:${categoria.idProjeto}`).emit('projetoAtualizado', resultadoProjeto.resposta.projeto);
            console.log(`📢 Projeto atualizado emitido via WebSocket (categoria eliminada).`);
          }
      
        return {
          status: 200,
          resposta: { sucesso: true, mensagem: 'Categoria arquivada com sucesso.', categoria },
        };
    }
    catch (error) {
        console.error("❌ Erro ao arquivar categoria:", error);
        return {
          status: 500,
          resposta: { sucesso: false, mensagem: 'Erro ao arquivar categoria.' }
        };
    }

    
  };
  
  const desarquivarCategoria = async (id) => {
    const categoria = await Categoria.findById(id);
    if (!categoria) {
      return { status: 404, resposta: { sucesso: false, mensagem: 'Categoria não encontrada.' } };
    }
  
    categoria.isArchived = false;
    await categoria.save();
  
    await Topico.updateMany({ categoriaId: id }, { isArchived: false });

    const io = getIO();
      const resultadoProjeto = await require('./projectServices').obterProjetoCompletoPorId(categoria.idProjeto);
  
      if (resultadoProjeto.status === 200 && resultadoProjeto.resposta?.projeto) {
        io.to(`projeto:${categoria.idProjeto}`).emit('projetoAtualizado', resultadoProjeto.resposta.projeto);
        console.log(`📢 Projeto atualizado emitido via WebSocket (categoria eliminada).`);
      }
  
    return {
      status: 200,
      resposta: { sucesso: true, mensagem: 'Categoria desarquivada com sucesso.', categoria },
    };
  };
  

module.exports = {
    criarCategoria,
    listarCategorias,
    obterCategoriaPorId,
    atualizarCategoria,
    apagarCategoria,
    obterCategoriaComTopicos,
    arquivarCategoria,
    desarquivarCategoria
};
