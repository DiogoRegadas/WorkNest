import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import NotFoundPage from './pages/404/NotFoundPage';
import InsideProjectPage from './pages/InsideProjectPage';

import PrivateRoute from './components/PrivateRoute/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
  {/* Outras rotas */}
  <Route path="/signin" element={<SignInPage />} />
  <Route path="/signup" element={<SignUpPage />} />
  <Route path="/" element={<LandingPage />} />

  {/* Rotas privadas */}
  {/* ⚠️ Não esquecer de adicionar o PrivateRoute */}
  <Route
    path="/home"
    element={
      <PrivateRoute>
        <HomePage />
      </PrivateRoute>
    }
  />
  <Route
    path="/projeto/:id"
    element={
      <PrivateRoute>
        <InsideProjectPage />
      </PrivateRoute>
    }
  />

  {/* ⚠️ Esta deve ser sempre a última */}
  <Route path="*" element={<NotFoundPage />} />
</Routes>
    </Router>
  );
}

export default App;
