import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching admin data
    setTimeout(() => {
      setUsers([
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
        { id: 3, name: 'Admin User', email: 'admin@example.com', role: 'admin' }
      ]);
      
      setBoards([
        { id: 1, name: 'Project Alpha', owner: 'John Doe', members: 3 },
        { id: 2, name: 'Project Beta', owner: 'Jane Smith', members: 2 }
      ]);
      
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      <header className="header">
        <h1>StormMatrix Admin Dashboard</h1>
        <nav>
          <Link to="/" style={{ color: 'white', marginLeft: '20px' }}>Home</Link>
        </nav>
      </header>
      <main className="container" style={{ textAlign: 'left', padding: '20px' }}>
        <h2>Admin Dashboard</h2>
        
        {loading ? (
          <p>Loading admin data...</p>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ flex: '1 1 400px' }}>
              <h3>User Management</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>ID</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Name</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Email</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.id}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.name}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.email}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div style={{ flex: '1 1 400px' }}>
              <h3>Board Management</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>ID</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Name</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Owner</th>
                    <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Members</th>
                  </tr>
                </thead>
                <tbody>
                  {boards.map(board => (
                    <tr key={board.id}>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{board.id}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{board.name}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{board.owner}</td>
                      <td style={{ border: '1px solid #ddd', padding: '8px' }}>{board.members}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
      <footer className="footer">
        <p>&copy; 2025 StormMatrix Kanban - Admin Panel</p>
      </footer>
    </>
  );
}

export default AdminDashboard;