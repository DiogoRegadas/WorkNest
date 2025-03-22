import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUtilizador } from '../services/api'; // <- função que vamos usar

function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem('');

    try {
      const resposta = await loginUtilizador({ email, password });

      if (resposta.sucesso) {
        // Guardar token e dados do utilizador no localStorage
        localStorage.setItem('token', resposta.token);
        localStorage.setItem('utilizador', JSON.stringify(resposta.utilizador));

        // Redirecionar para a página do utilizador
        navigate('/user');
      } else {
        setMensagem(`❌ ${resposta.mensagem}`);
      }
    } catch (erro) {
      setMensagem(`❌ ${erro.mensagem || 'Erro ao fazer login.'}`);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2>Iniciar Sessão</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Entrar</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}

export default SignInPage;
  