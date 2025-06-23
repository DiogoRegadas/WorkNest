const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Utilizador',
    required: false,
  },
  tipo: {
    type: String,
    enum: ['auth', 'logout', 'error', 'update', 'view', 'custom'],
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
