import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UserPage() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const utilizador = JSON.parse(localStorage.getItem('utilizador'));

    if (utilizador && utilizador.email) {
      setEmail(utilizador.email);
    } else {
      navigate('/signin'); // Se não houver sessão, redireciona para login
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('utilizador');
    navigate('/');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2>Área do Utilizador</h2>
      <p>Bem-vindo, {email}</p>
      <button onClick={handleLogout}>Terminar Sessão</button>
    </div>
  );
}

export default UserPage;
