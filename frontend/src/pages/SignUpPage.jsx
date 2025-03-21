import { useState } from 'react';
import { registarUtilizador } from '../services/api';

function SignUpPage() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem('');

    try {
      const resultado = await registarUtilizador({ nome, email, password });
      setMensagem('✅ Utilizador criado com sucesso!');
      console.log('Resultado:', resultado);
      // Podes redirecionar ou limpar os campos aqui
    } catch (erro) {
      setMensagem(`❌ Erro: ${erro.message || 'Erro ao registar.'}`);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2>Criar Conta</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        /><br /><br />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br /><br />
        <button type="submit">Registar</button>
      </form>

      {mensagem && <p style={{ marginTop: '20px' }}>{mensagem}</p>}
    </div>
  );
}

export default SignUpPage;