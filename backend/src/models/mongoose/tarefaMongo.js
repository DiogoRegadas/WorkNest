const mongoose = require('mongoose');
const AnexoSchema = require('./AnexoSchema.js');
const { Schema } = mongoose;


const TarefaSchema = new Schema({
  titulo: { type: String, required: true, trim: true },
  descricao: { type: String, trim: true },
  idTopico: { type: mongoose.Schema.Types.ObjectId, ref: 'Topico', required: true },
  dataEntrega: { type: Date, default: null },
  status: {
    type: String,
    enum: ['pendente', 'em progresso', 'concluída'],
    default: 'pendente'
  },
  responsavel: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  respostaDescricao: { type: String, trim: true },
  anexos: [{
  nomeOriginal: String,
  ficheiroId: mongoose.Schema.Types.ObjectId,
  mimeType: String,
  tamanho: Number
}]
}, {
  timestamps: true
});

module.exports = mongoose.model('Tarefa', TarefaSchema, 't_tarefas');
