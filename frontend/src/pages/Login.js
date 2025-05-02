import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login API call
    if (email === 'admin@example.com' && password === 'admin') {
      localStorage.setItem('userRole', 'admin');
      navigate('/admin');
    } else if (email === 'user@example.com' && password === 'user') {
      localStorage.setItem('userRole', 'user');
      navigate('/');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <>
      <header className="header">
        <h1>StormMatrix Kanban</h1>
      </header>
      <main className="container">
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
          <h2>Login</h2>
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
              <label style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                style={{ width: '100%', padding: '8px' }}
              />
            </div>
            <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#282c34', color: 'white', border: 'none', cursor: 'pointer' }}>
              Login
            </button>
          </form>
          <p style={{ marginTop: '20px' }}>
            <Link to="/" style={{ color: '#282c34' }}>Back to Home</Link>
          </p>
          <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
            <h4>Test Credentials:</h4>
            <p>Admin: admin@example.com / admin</p>
            <p>User: user@example.com / user</p>
          </div>
        </div>
      </main>
      <footer className="footer">
        <p>&copy; 2025 StormMatrix Kanban - All rights reserved</p>
      </footer>
    </>
  );
}

export default Login;