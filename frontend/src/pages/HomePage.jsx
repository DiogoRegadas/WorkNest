import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Bem-vindo ao WorkNest</h1>
      <p>Plataforma de colaboração para estudantes e equipas pequenas.</p>
      <div style={{ marginTop: '30px' }}>
        <Link to="/signin"><button>Sign In</button></Link>
        <Link to="/signup" style={{ marginLeft: '20px' }}><button>Sign Up</button></Link>
      </div>
    </div>
  );
}

export default HomePage;
