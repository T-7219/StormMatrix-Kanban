import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import './Dashboard.css';

function Dashboard() {
  const [personalBoards, setPersonalBoards] = useState([]);
  const [teamBoards, setTeamBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newBoardName, setNewBoardName] = useState('');
  const [newBoardType, setNewBoardType] = useState('personal');
  
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // Перенаправление на страницу входа, если пользователь не авторизован
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);
  
  // Запрос досок с сервера
  useEffect(() => {
    const fetchBoards = async () => {
      if (!currentUser) return;
      
      setLoading(true);
      try {
        // В реальном приложении здесь будет API запрос
        // const response = await axios.get('/api/v1/boards', {
        //   headers: { Authorization: `Bearer ${currentUser.token}` }
        // });
        
        // Имитация задержки сетевого запроса
        setTimeout(() => {
          // Мок-данные для имитации ответа сервера
          const mockPersonalBoards = [
            { 
              id: 'board-1', 
              name: 'Личные задачи', 
              description: 'Мои повседневные задачи и цели', 
              cards: 8, 
              owner: currentUser.name,
              updatedAt: new Date().toISOString()
            },
            { 
              id: 'board-2', 
              name: 'Рабочие проекты', 
              description: 'Отслеживание задач по рабочим проектам', 
              cards: 15, 
              owner: currentUser.name,
              updatedAt: new Date(Date.now() - 86400000).toISOString() // вчера
            }
          ];
          
          const mockTeamBoards = [
            { 
              id: 'board-3', 
              name: 'Разработка фронтенда', 
              description: 'Задачи по разработке UI компонентов', 
              cards: 12, 
              owner: 'Ольга Смирнова',
              updatedAt: new Date(Date.now() - 172800000).toISOString() // позавчера
            },
            { 
              id: 'board-4', 
              name: 'Бэкенд-микросервисы', 
              description: 'Разработка микросервисной архитектуры', 
              cards: 10, 
              owner: 'Иван Петров',
              updatedAt: new Date(Date.now() - 259200000).toISOString() // 3 дня назад
            },
            { 
              id: 'board-5', 
              name: 'Тестирование проекта', 
              description: 'QA и автоматизированное тестирование', 
              cards: 7, 
              owner: 'Алексей Иванов',
              updatedAt: new Date(Date.now() - 345600000).toISOString() // 4 дня назад
            }
          ];
          
          setPersonalBoards(mockPersonalBoards);
          setTeamBoards(mockTeamBoards);
          setLoading(false);
        }, 800);
      } catch (err) {
        console.error("Error fetching boards:", err);
        setError("Не удалось загрузить доски. Пожалуйста, попробуйте позже.");
        setLoading(false);
      }
    };
    
    fetchBoards();
  }, [currentUser]);
  
  // Форматирование даты обновления
  const formatUpdatedAt = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Сегодня';
    } else if (diffDays === 1) {
      return 'Вчера';
    } else {
      return `${diffDays} дн. назад`;
    }
  };
  
  // Создание новой доски
  const handleCreateBoard = () => {
    if (!newBoardName.trim()) {
      return;
    }
    
    // В реальном приложении здесь будет API запрос для создания доски
    // await axios.post('/api/v1/boards', { 
    //   name: newBoardName, 
    //   type: newBoardType
    // }, {
    //   headers: { Authorization: `Bearer ${currentUser.token}` }
    // });
    
    // Имитация создания доски
    const newBoard = {
      id: `board-${Date.now()}`,
      name: newBoardName,
      description: '',
      cards: 0,
      owner: currentUser.name,
      updatedAt: new Date().toISOString()
    };
    
    if (newBoardType === 'personal') {
      setPersonalBoards([newBoard, ...personalBoards]);
    } else {
      setTeamBoards([newBoard, ...teamBoards]);
    }
    
    setNewBoardName('');
    setShowCreateModal(false);
  };
  
  // Выход из аккаунта
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  if (!currentUser) {
    return null; // Компонент вернет null, если пользователь не авторизован (обработано в useEffect)
  }
  
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>StormMatrix Kanban</h1>
          <nav className="main-nav">
            <span>Доски</span>
            <span>Задачи</span>
            <span>Команда</span>
          </nav>
          <div className="user-menu">
            <span>{currentUser.name}</span>
            <div className="user-avatar">
              {currentUser.name.charAt(0).toUpperCase()}
            </div>
            <button className="logout-button" onClick={handleLogout}>
              Выйти
            </button>
          </div>
        </div>
      </header>
      
      <main className="dashboard-content">
        <div className="dashboard-title">
          <h2>Мои доски</h2>
          <button 
            className="create-board-button"
            onClick={() => setShowCreateModal(true)}
          >
            + Создать доску
          </button>
        </div>
        
        {loading ? (
          <div className="loading-container">
            <div className="loader"></div>
            <p>Загрузка досок...</p>
          </div>
        ) : error ? (
          <div className="error-message">
            {error}
          </div>
        ) : (
          <>
            <section className="boards-section">
              <h3>Личные доски</h3>
              <div className="boards-grid">
                {personalBoards.map(board => (
                  <Link to={`/board/${board.id}`} key={board.id} className="board-card">
                    <div className="board-card-content">
                      <h4>{board.name}</h4>
                      <p>{board.description}</p>
                      <div className="board-card-footer">
                        <div className="board-card-stats">
                          <span>{board.cards} карточек</span>
                          <span className="updated-at">Обновлено: {formatUpdatedAt(board.updatedAt)}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
                
                <button 
                  className="add-board-card"
                  onClick={() => {
                    setNewBoardType('personal');
                    setShowCreateModal(true);
                  }}
                >
                  <div className="add-board-content">
                    <span className="add-icon">+</span>
                    <p>Создать личную доску</p>
                  </div>
                </button>
              </div>
            </section>
            
            <section className="boards-section">
              <h3>Командные доски</h3>
              <div className="boards-grid">
                {teamBoards.map(board => (
                  <Link to={`/board/${board.id}`} key={board.id} className="board-card">
                    <div className="board-card-content">
                      <h4>{board.name}</h4>
                      <p>{board.description}</p>
                      <div className="board-card-footer">
                        <div className="board-card-stats">
                          <span>{board.cards} карточек</span>
                          <span className="board-owner">Владелец: {board.owner}</span>
                          <span className="updated-at">Обновлено: {formatUpdatedAt(board.updatedAt)}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
                
                <button 
                  className="add-board-card"
                  onClick={() => {
                    setNewBoardType('team');
                    setShowCreateModal(true);
                  }}
                >
                  <div className="add-board-content">
                    <span className="add-icon">+</span>
                    <p>Создать командную доску</p>
                  </div>
                </button>
              </div>
            </section>
          </>
        )}
      </main>
      
      {showCreateModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Создать новую доску</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleCreateBoard();
            }}>
              <div className="form-group">
                <label htmlFor="board-name">Название доски</label>
                <input 
                  type="text"
                  id="board-name"
                  value={newBoardName}
                  onChange={(e) => setNewBoardName(e.target.value)}
                  placeholder="Введите название доски"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Тип доски</label>
                <div className="radio-options">
                  <label>
                    <input
                      type="radio"
                      name="board-type"
                      value="personal"
                      checked={newBoardType === 'personal'}
                      onChange={() => setNewBoardType('personal')}
                    />
                    Личная
                  </label>
                  
                  <label>
                    <input
                      type="radio"
                      name="board-type"
                      value="team"
                      checked={newBoardType === 'team'}
                      onChange={() => setNewBoardType('team')}
                    />
                    Командная
                  </label>
                </div>
              </div>
              
              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setShowCreateModal(false)}
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="create-button"
                >
                  Создать
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      <footer className="dashboard-footer">
        <p>&copy; 2025 StormMatrix Kanban - Все права защищены</p>
      </footer>
    </div>
  );
}

export default Dashboard;