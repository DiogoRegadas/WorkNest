// backend/src/models/mongoose/tarefaSchema.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

const TarefaSchema = new Schema({
  titulo: { type: String, required: true },
  descricao: { type: String },
  idTopico: { type: mongoose.Schema.Types.ObjectId, ref: 'Topico', required: true },
  dataEntrega: { type: Date, default: null },
  status: { type: String, default: 'pendente' },
  responsavel: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  anexos: [{ type: String }] // caminhos dos ficheiros
}, {
  timestamps: true
});

module.exports = mongoose.model('Tarefa', TarefaSchema);
