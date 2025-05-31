const mongoose = require('mongoose');
const { Schema } = mongoose;

const AnexoSchema = new Schema({
  nomeOriginal: { type: String, required: true }, // Nome do ficheiro no momento do upload
  caminho: { type: String, required: true },       // Caminho/localização do ficheiro
  tipoMime: { type: String },                      // Ex: 'application/pdf'
  tamanho: { type: Number },                       // Tamanho em bytes
  tarefaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tarefa', required: true }
}, {
  timestamps: true
});

module.exports = AnexoSchema;
