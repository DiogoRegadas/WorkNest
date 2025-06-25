const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false,
  },
  projetoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Projeto',
    required: false,
  },
  tipo: {
    type: String,
    enum: [
      'auth', 'logout', 'error', 'update', 'view', 'custom',
      'categoria', 'topico', 'tarefa', 'projeto' // 👈 adicionados
    ],
    required: true,
  },
  detalhe: {
    type: String,
  },
  data: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Log', LogSchema);
