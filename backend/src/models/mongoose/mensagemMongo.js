// models/Mensagem.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MensagemSchema = new Schema({
  conteudo: {
    type: String,
    required: true,
    trim: true
  },
  autor: {
    type: Schema.Types.ObjectId,
    ref: 'Utilizador', // ou 'User', dependendo do teu schema de utilizadores
    required: true
  },
  topico: {
    type: Schema.Types.ObjectId,
    ref: 'Topico',
    required: true
  },
  dataEnvio: {
    type: Date,
    default: Date.now
  },
  editada: {
    type: Boolean,
    default: false
  },
  dataEdicao: {
    type: Date,
    default: null
  },
  anexos: [{
    nomeOriginal: String,
    caminho: String,
    tipo: String,
    tamanho: Number
  }],
  lidaPor: [{
    type: Schema.Types.ObjectId,
    ref: 'Utilizador'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Mensagem', MensagemSchema, 't_mensagens');

