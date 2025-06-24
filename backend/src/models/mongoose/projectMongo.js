const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProjetoSchema = new Schema({
  nome: { type: String, required: true },
  descricao: { type: String },
  deadline: { type: Date }, // ✅ Novo campo
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  listaUtilizadores: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  listaCategorias: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Categoria' }]
}, {
  timestamps: true // Campos createdAt e updatedAt
});

module.exports = mongoose.model('Projeto', ProjetoSchema, 't_project');
