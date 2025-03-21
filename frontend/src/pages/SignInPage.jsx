function SignInPage() {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <h2>Iniciar Sessão</h2>
        <form>
          <input type="email" placeholder="Email" /><br /><br />
          <input type="password" placeholder="Password" /><br /><br />
          <button type="submit">Entrar</button>
        </form>
      </div>
    );
  }
  
  export default SignInPage;
  