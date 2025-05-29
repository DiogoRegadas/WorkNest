require('dotenv').config(); // ← Lê o .env na pasta functions
const jwt = require('jsonwebtoken');

// Certifica-te de que tens JWT_SECRET no teu .env
const secret = "qkNI2MFRwRxAyPpXKtbTxS1lJYKEJUqC+vbjIXWklGw=";

if (!secret) {
  console.error("❌ JWT_SECRET não definido no .env!");
  process.exit(1);
}

// Payload do token — podes ajustar consoante o que o backend espera
const payload = {
  id: "firebase-functions",
  role: "system",
  acesso: "funções-automáticas"
};

// Opcional: configurações como validade do token
const options = {
  expiresIn: '1d' // ou '12h', '30m', etc.
};
// Gera o token
const token = jwt.sign(payload, secret, options);

// Mostra o token no terminal
console.log("✅ Token JWT gerado com sucesso:\n");
console.log(token);
console.log("\n💡 Copia este token e cola-o no Authorization das funções Firebase.");
