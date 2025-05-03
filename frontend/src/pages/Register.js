import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Проверка на совпадение паролей
    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }
    
    // Простая проверка на сложность пароля
    if (password.length < 6) {
      setError('Пароль должен содержать не менее 6 символов');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const result = await register(name, email, password);
      setSuccess(result.message);
      
      // Перенаправляем на страницу входа через 3 секунды
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError(err.message || 'Произошла ошибка при регистрации');
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
          <h2>Регистрация</h2>
          
          {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
          {success && <div style={{ color: 'green', marginBottom: '10px' }}>{success}</div>}
          
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Имя:</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
                style={{ width: '100%', padding: '8px' }}
              />
            </div>
            
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
              <small style={{ color: '#666', display: 'block', marginTop: '5px' }}>
                Не менее 6 символов
              </small>
            </div>
            
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Подтвердите пароль:</label>
              <input 
                type="password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
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
              {loading ? 'Регистрация...' : 'Зарегистрироваться'}
            </button>
          </form>
          
          <p style={{ marginTop: '20px' }}>
            Уже есть аккаунт? <Link to="/login" style={{ color: '#282c34' }}>Войти</Link>
          </p>
          
          <p style={{ marginTop: '10px' }}>
            <Link to="/" style={{ color: '#282c34' }}>На главную</Link>
          </p>
        </div>
      </main>
      <footer className="footer">
        <p>&copy; 2025 StormMatrix Kanban - Все права защищены</p>
      </footer>
    </>
  );
}

export default Register;