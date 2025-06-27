const Pedido = require('../models/mongoose/PedidoMongo');
const User = require('../models/mongoose/userMongo');
const Projeto = require('../models/mongoose/projectMongo'); // ← IMPORTANTE

const enviarPedido = async (dados, idRemetente) => {
  try {
    const filtroBase = {
      tipo: dados.tipo,
      de: idRemetente,
      para: dados.para,
      estado: 'pendente'
    };

    // Se for pedido de projeto, verifica também o idProjeto
    if (dados.tipo === 'projeto' && dados.idProjeto) {
      filtroBase.idProjeto = dados.idProjeto;
    }

    const pedidoExistente = await Pedido.findOne(filtroBase);

    if (pedidoExistente) {
      return {
        status: 400,
        resposta: { sucesso: false, mensagem: 'Já existe um pedido pendente semelhante para este utilizador.' }
      };
    }

    const novoPedido = new Pedido({
      tipo: dados.tipo,
      de: idRemetente,
      para: dados.para,
      idProjeto: dados.idProjeto || null,
      mensagem: dados.mensagem || '',
      estado: 'pendente'
    });

    await novoPedido.save();

    return {
      status: 201,
      resposta: { sucesso: true, mensagem: 'Pedido enviado com sucesso.', pedido: novoPedido }
    };

  } catch (error) {
    console.error('❌ Erro no serviço ao enviar pedido:', error);
    return {
      status: 500,
      resposta: { sucesso: false, mensagem: 'Erro ao enviar pedido.' }
    };
  }
};


const responderPedido = async (idPedido, resposta, idUtilizador) => {
  try {
    const pedido = await Pedido.findById(idPedido);

    if (!pedido) {
      return {
        status: 404,
        resposta: { sucesso: false, mensagem: 'Pedido não encontrado.' }
      };
    }

    if (pedido.para.toString() !== idUtilizador) {
      return {
        status: 403,
        resposta: { sucesso: false, mensagem: 'Não autorizado a responder a este pedido.' }
      };
    }

    pedido.estado = resposta; // 'aceite' ou 'recusado'
    await pedido.save();

    // Se for aceite e do tipo amizade
    if (resposta === 'aceite' && pedido.tipo === 'amizade') {
      const utilizador1 = await User.findById(pedido.de);
      const utilizador2 = await User.findById(pedido.para);

      if (!utilizador1.friends.includes(pedido.para)) {
        utilizador1.friends.push(pedido.para);
        await utilizador1.save();
      }

      if (!utilizador2.friends.includes(pedido.de)) {
        utilizador2.friends.push(pedido.de);
        await utilizador2.save();
      }
    }

    // Se for aceite e do tipo projeto
    if (resposta === 'aceite' && pedido.tipo === 'projeto') {
      const projeto = await Projeto.findById(pedido.idProjeto);

      if (!projeto) {
        return {
          status: 404,
          resposta: { sucesso: false, mensagem: 'Projeto não encontrado.' }
        };
      }

      if (!projeto.listaUtilizadores.map(id => id.toString()).includes(pedido.para.toString())) {
        projeto.listaUtilizadores.push(pedido.para);
        await projeto.save();
      }
      
      
    }

    return {
      status: 200,
      resposta: { sucesso: true, mensagem: `Pedido ${resposta} com sucesso.` }
    };

  } catch (error) {
    console.error('❌ Erro ao responder ao pedido:', error);
    return {
      status: 500,
      resposta: { sucesso: false, mensagem: 'Erro ao responder ao pedido.' }
    };
  }
};

const listarPedidosPendentes = async (idUtilizador) => {
  try {
    const recebidos = await Pedido.find({
      para: idUtilizador,
      estado: 'pendente'
    })
      .populate('de', 'firstName lastName')
      .populate('idProjeto', 'nome'); 

    const enviados = await Pedido.find({
      de: idUtilizador,
      estado: 'pendente'
    }).populate('para', 'firstName lastName');

    return {
      sucesso: true,
      recebidos,
      enviados
    };
  } catch (error) {
    console.error('❌ Erro ao listar pedidos pendentes:', error);
    return {
      sucesso: false,
      mensagem: 'Erro ao listar pedidos.'
    };
  }
};

module.exports = {
  enviarPedido,
  responderPedido,
  listarPedidosPendentes
};
