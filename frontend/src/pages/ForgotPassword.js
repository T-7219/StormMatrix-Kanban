import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { resetPassword } = useContext(AuthContext);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const result = await resetPassword(email);
      setSuccess(result.message);
    } catch (err) {
      setError(err.message || 'Произошла ошибка при восстановлении пароля');
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
          <h2>Восстановление пароля</h2>
          
          {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
          {success && <div style={{ color: 'green', marginBottom: '10px' }}>{success}</div>}
          
          <p style={{ marginBottom: '15px' }}>
            Укажите ваш email, и мы отправим вам инструкции по восстановлению пароля.
          </p>
          
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
              {loading ? 'Отправка...' : 'Восстановить пароль'}
            </button>
          </form>
          
          <p style={{ marginTop: '20px' }}>
            <Link to="/login" style={{ color: '#282c34' }}>Вернуться на страницу входа</Link>
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

export default ForgotPassword;