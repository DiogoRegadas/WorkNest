const axios = require('axios');
const bcrypt = require('bcryptjs'); // mesmo que no frontend

// ⚠️ Password original antes de hash
const plainPassword = "Admin123!";

async function criarAdmin() {
  try {
    // Gerar hash da password (mesmo algoritmo e salt rounds que no frontend)
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const novoAdmin = {
      firstName: "Admin",
      lastName: "WorkNest",
      localidade: "Lisboa",
      email: "admin@worknest.com",
      password: hashedPassword, // já encriptada
      nivelAcesso: 2
    };

    const resposta = await axios.post("http://localhost:3000/api/users/register", novoAdmin);
    console.log("✅ Admin criado com sucesso:", resposta.data);
  } catch (erro) {
    console.error("❌ Erro ao criar admin:", erro.response?.data || erro.message || erro);
  }
}

criarAdmin();
