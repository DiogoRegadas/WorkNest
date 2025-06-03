const TarefaService = require('../services/tarefaServices');
const Tarefa = require('../models/mongoose/tarefaMongo');
const { getBucket } = require('../config/db'); // ex: '../db' ou '../config/database'

console.log("🧪 getBucket é:", typeof getBucket); // deve dar "function"

exports.criarTarefa = async (req, res) => {
  try {
    const resultado = await TarefaService.criarTarefa(req.body);
    return res.status(resultado.status).json(resultado.resposta);
  } catch (error) {
    console.error("❌ Erro ao criar tarefa:", error);
    return res.status(500).json({ sucesso: false, mensagem: 'Erro ao criar tarefa.' });
  }
};

exports.listarTarefas = async (req, res) => {
  try {
    const resultado = await TarefaService.listarTarefas();
    return res.status(resultado.status).json(resultado.resposta);
  } catch (error) {
    console.error("❌ Erro ao listar tarefas:", error);
    return res.status(500).json({ sucesso: false, mensagem: 'Erro ao listar tarefas.' });
  }
};

exports.obterTarefaPorId = async (req, res) => {
  try {
    const resultado = await TarefaService.obterTarefaPorId(req.params.id);
    return res.status(resultado.status).json(resultado.resposta);
  } catch (error) {
    console.error("❌ Erro ao obter tarefa:", error);
    return res.status(500).json({ sucesso: false, mensagem: 'Erro ao obter tarefa.' });
  }
};

exports.atualizarTarefa = async (req, res) => {
  try {
    
    const resultado = await TarefaService.atualizarTarefa(req.params.id, req.body);
    return res.status(resultado.status).json(resultado.resposta);
  } catch (error) {
    console.error("❌ Erro ao atualizar tarefa:", error);
    return res.status(500).json({ sucesso: false, mensagem: 'Erro ao atualizar tarefa.' });
  }
};

exports.apagarTarefa = async (req, res) => {
  try {
    const resultado = await TarefaService.apagarTarefa(req.params.id);
    return res.status(resultado.status).json(resultado.resposta);
  } catch (error) {
    console.error("❌ Erro ao apagar tarefa:", error);
    return res.status(500).json({ sucesso: false, mensagem: 'Erro ao apagar tarefa.' });
  }
};

// ✅ Novo controlador para upload de anexos
exports.uploadAnexos = async (req, res) => {
  try {
    const { id } = req.params;
    const { ivs = [], nomes = [], tipos = [], tamanhos = [] } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ sucesso: false, mensagem: 'Nenhum ficheiro enviado.' });
    }

    const bucket = getBucket();
    const anexos = [];

    for (let i = 0; i < req.files.length; i++) {
  const file = req.files[i];

  const iv = Array.isArray(ivs) ? ivs[i] : ivs;
  const nome = Array.isArray(nomes) ? nomes[i] : file.originalname;
  const tipo = Array.isArray(tipos) ? tipos[i] : file.mimetype;
  const tamanho = Array.isArray(tamanhos) ? tamanhos[i] : file.size;

  const uploadStream = bucket.openUploadStream(nome, {
    contentType: tipo,
    metadata: { iv }
  });

  uploadStream.end(file.buffer);

  await new Promise((resolve, reject) => {
    uploadStream.on('finish', (fileInfo) => {
      // Este _id é o ID real usado pelo Mongo
      anexos.push({
        nomeOriginal: nome,
        ficheiroId: fileInfo._id, // <--- aqui sim!
        mimeType: tipo,
        tamanho: tamanho
      });
      resolve();
    });

    uploadStream.on('error', reject);
  });
}


    const tarefaAtualizada = await Tarefa.findByIdAndUpdate(
      id,
      { $push: { anexos: { $each: anexos } } },
      { new: true }
    );

    if (!tarefaAtualizada) {
      return res.status(404).json({ sucesso: false, mensagem: 'Tarefa não encontrada.' });
    }

    return res.status(200).json({
      sucesso: true,
      mensagem: 'Ficheiros anexados com sucesso.',
      tarefa: tarefaAtualizada
    });
  } catch (error) {
    console.error("❌ Erro ao enviar anexos:", error);
    return res.status(500).json({ sucesso: false, mensagem: 'Erro ao enviar anexos.' });
  }
};


exports.downloadAnexo = async (req, res) => {
  try {
    const { ficheiroId } = req.params;

    const bucket = getBucket();
    const objectId = new mongoose.Types.ObjectId(ficheiroId);

    const downloadStream = bucket.openDownloadStream(objectId);

    downloadStream.on('file', (file) => {
      res.set({
        'Content-Type': file.contentType,
        'Content-Disposition': `attachment; filename="${file.filename}"`,
      });
    });

    downloadStream.on('error', (err) => {
      console.error("❌ Erro ao fazer download:", err);
      return res.status(404).json({ sucesso: false, mensagem: 'Ficheiro não encontrado.' });
    });

    downloadStream.pipe(res);
  } catch (error) {
    console.error("❌ Erro geral no download:", error);
    return res.status(500).json({ sucesso: false, mensagem: 'Erro ao fazer download do anexo.' });
  }
};