const mongoose = require('mongoose');

const AvaliacaoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilizador', required: true },
  valor: { type: Number, required: true, min: 0, max: 5 },
  mensagem: { type: String },
  dataCriacao: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Avaliacao', AvaliacaoSchema, 't_avaliacoes'); // 't_avaliacoes' é o nome da coleção no MongoDB