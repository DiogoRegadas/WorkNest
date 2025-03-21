const mongoose = require('mongoose');

// Definição do esquema
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    publicKey: { type: String, required: true },
}, {
    timestamps: true, // Campos createdAt e updatedAt
});

// Exporta o modelo
module.exports = mongoose.model('User', UserSchema, 't_user');
