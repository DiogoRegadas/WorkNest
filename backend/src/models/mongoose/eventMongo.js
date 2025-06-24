// models/mongoose/eventMongo.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const EventoSchema = new Schema({
  tipo: {
    type: String,
    enum: ['projeto', 'tarefa'],
    required: true
  },
  referenciaId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  nome: { type: String, required: true },
  data: { type: Date, required: true },
  idProjeto: { type: mongoose.Schema.Types.ObjectId, ref: 'Projeto', required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Evento', EventoSchema, 't_eventos');
