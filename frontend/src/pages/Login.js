import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const { login, error } = useContext(AuthContext);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = await login(email, password);
      if (result.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header className="header">
        <h1>StormMatrix Kanban</h1>
      </header>
      <main className="container">
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
          <h2>Вход в систему</h2>
          {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                style={{ width: '100%', padding: '8px' }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Пароль:</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                style={{ width: '100%', padding: '8px' }}
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              style={{ 
                padding: '10px 15px', 
                backgroundColor: '#282c34', 
                color: 'white', 
                border: 'none', 
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? 'Вход...' : 'Войти'}
            </button>
          </form>
          
          <div style={{ marginTop: '20px' }}>
            <Link to="/forgot-password" style={{ color: '#282c34', display: 'block', marginBottom: '10px' }}>
              Забыли пароль?
            </Link>
            <p>
              Нет аккаунта? <Link to="/register" style={{ color: '#282c34' }}>Зарегистрироваться</Link>
            </p>
            <p style={{ marginTop: '10px' }}>
              <Link to="/" style={{ color: '#282c34' }}>На главную</Link>
            </p>
          </div>
          
          <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
            <h4>Тестовые учетные данные:</h4>
            <p>Админ: admin@example.com / admin</p>
            <p>Пользователь: user@example.com / user</p>
          </div>
        </div>
      </main>
      <footer className="footer">
        <p>&copy; 2025 StormMatrix Kanban - Все права защищены</p>
      </footer>
    </>
  );
}

export default Login;