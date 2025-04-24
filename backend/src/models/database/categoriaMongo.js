const mongoose = require('mongoose');
const { Schema } = mongoose;

const CategoriaSchema = new Schema({
  nome: { type: String, required: true },
  descricao: { type: String },
  idProjeto: { type: mongoose.Schema.Types.ObjectId, ref: 'Projeto', required: true },
  listaTopicos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Topico' }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Categoria', CategoriaSchema);