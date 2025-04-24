// backend/src/models/mongoose/mensagemSchema.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

const MensagemSchema = new Schema({
  conteudo: { type: String, required: true },
  autor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  idTopico: { type: mongoose.Schema.Types.ObjectId, ref: 'Topico', required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Mensagem', MensagemSchema);
