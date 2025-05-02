import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [loading, setLoading] = useState(true);
  const [boards, setBoards] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate fetching boards data
    setTimeout(() => {
      setBoards([
        { id: 1, name: 'Sample Project 1' },
        { id: 2, name: 'Sample Project 2' },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      <header className="header">
        <h1>StormMatrix Kanban</h1>
        <nav>
          <Link to="/login" style={{ color: 'white', marginLeft: '20px' }}>Login</Link>
        </nav>
      </header>
      <main className="container">
        <h2>Welcome to StormMatrix Kanban</h2>
        {loading ? (
          <p>Loading boards...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div>
            <h3>Your Boards</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {boards.map(board => (
                <li key={board.id} style={{ margin: '10px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
                  {board.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
      <footer className="footer">
        <p>&copy; 2025 StormMatrix Kanban - All rights reserved</p>
      </footer>
    </>
  );
}

export default Home;