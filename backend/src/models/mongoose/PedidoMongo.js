const mongoose = require('mongoose');
const { Schema } = mongoose;

const PedidoSchema = new Schema({
  tipo: { type: String, enum: ['amizade', 'projeto'], required: true },
  de: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  para: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  idProjeto: { type: Schema.Types.ObjectId, ref: 'Projeto' }, // opcional
  mensagem: { type: String },
  estado: { type: String, enum: ['pendente', 'aceite', 'recusado'], default: 'pendente' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Pedido', PedidoSchema, 't_pedidos');
