// src/pages/LoginPage.jsx
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

function LoginPage() {
  const navigate = useNavigate();
  const handleLogin = () => navigate('/logs');
  return <LoginForm onLogin={handleLogin} />;
}

export default LoginPage;
