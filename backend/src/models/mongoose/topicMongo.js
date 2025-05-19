// backend/src/models/mongoose/topicoSchema.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

const TopicoSchema = new Schema({
  titulo: { type: String, required: true },
  descricao: { type: String },
  idCategoria: { type: mongoose.Schema.Types.ObjectId, ref: 'Categoria', required: true },
  isArchived: { type: Boolean, default: false },
  listaMensagens: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Mensagem' }],
  listaTarefas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tarefa' }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Topico', TopicoSchema, 't_topico');
