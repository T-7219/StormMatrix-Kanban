import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import './Home.css';

function Home() {
  const [demoBoards, setDemoBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // Если пользователь авторизован, перенаправляем на дашборд
  useEffect(() => {
    if (currentUser) {
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);

  // Загружаем демо-доски для отображения на главной
  useEffect(() => {
    const fetchBoards = async () => {
      try {
        // Имитация запроса к API
        setLoading(true);
        
        setTimeout(() => {
          const mockData = [
            { id: 1, name: 'Разработка проекта', description: 'Управление задачами команды разработчиков', cards: 12 },
            { id: 2, name: 'Маркетинговая кампания', description: 'Планирование и отслеживание маркетинговых активностей', cards: 8 },
            { id: 3, name: 'Деплой и CI/CD', description: 'Настройка автоматического развертывания', cards: 5 },
          ];
          
          setDemoBoards(mockData);
          setLoading(false);
        }, 800);
      } catch (err) {
        setError('Ошибка при загрузке досок. Пожалуйста, попробуйте позже.');
        setLoading(false);
      }
    };

    fetchBoards();
  }, []);

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="header-content">
          <h1>StormMatrix Kanban</h1>
          <nav className="header-nav">
            <Link to="/login" className="nav-link">Войти</Link>
            <Link to="/register" className="nav-btn">Регистрация</Link>
          </nav>
        </div>
      </header>
      
      <main className="home-main">
        <section className="hero-section">
          <div className="hero-content">
            <h2>Эффективное управление проектами с StormMatrix Kanban</h2>
            <p>Организуйте задачи, повысьте продуктивность команды и доводите проекты до завершения с помощью гибких Kanban-досок.</p>
            <div className="hero-buttons">
              <Link to="/register" className="primary-btn">Зарегистрироваться</Link>
              <Link to="/login" className="secondary-btn">Войти в систему</Link>
            </div>
          </div>
          <div className="hero-image">
            <img src="/kanban-illustration.png" alt="Kanban доска" />
          </div>
        </section>
        
        <section className="features-section">
          <h3>Основные возможности</h3>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📋</div>
              <h4>Интуитивные Kanban-доски</h4>
              <p>Перетаскивание карточек, настраиваемые колонки и обновления в реальном времени.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h4>Командное взаимодействие</h4>
              <p>Общие доски, назначение задач и комментирование карточек.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🔄</div>
              <h4>Настраиваемые рабочие процессы</h4>
              <p>Определяйте собственные колонки, этапы работы и правила автоматизации.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🔔</div>
              <h4>Уведомления</h4>
              <p>Получайте оповещения о назначениях, приближающихся сроках и изменениях.</p>
            </div>
          </div>
        </section>
        
        {loading ? (
          <div className="loading-section">
            <div className="loader"></div>
            <p>Загрузка примеров...</p>
          </div>
        ) : error ? (
          <div className="error-message">
            <p>{error}</p>
          </div>
        ) : (
          <section className="demo-section">
            <h3>Примеры досок</h3>
            <div className="demo-boards">
              {demoBoards.map(board => (
                <div key={board.id} className="demo-board-card">
                  <h4>{board.name}</h4>
                  <p>{board.description}</p>
                  <div className="demo-board-footer">
                    <span className="card-count">{board.cards} карточек</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="demo-note">
              <p>Зарегистрируйтесь или войдите, чтобы создавать собственные доски.</p>
              <Link to="/register" className="primary-btn">Начать работу</Link>
            </div>
          </section>
        )}
      </main>
      
      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-logo">
            <h3>StormMatrix Kanban</h3>
            <p>Профессиональная система Kanban-досок</p>
          </div>
          
          <div className="footer-links">
            <div className="footer-column">
              <h4>О нас</h4>
              <a href="#">Команда</a>
              <a href="#">История</a>
              <a href="#">Контакты</a>
            </div>
            
            <div className="footer-column">
              <h4>Возможности</h4>
              <a href="#">Kanban-доски</a>
              <a href="#">Командная работа</a>
              <a href="#">Интеграции</a>
            </div>
            
            <div className="footer-column">
              <h4>Ресурсы</h4>
              <a href="#">Документация</a>
              <a href="#">Поддержка</a>
              <a href="#">Блог</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 StormMatrix Kanban - Все права защищены</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;