import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import KanbanBoard from '../../components/board/KanbanBoard';
import './BoardPage.css';

const BoardPage = () => {
  const { id } = useParams();
  const [boardName, setBoardName] = useState('Проект разработки');
  const [showFilters, setShowFilters] = useState(false);
  
  return (
    <div className="board-page">
      <div className="board-header">
        <div className="board-title">
          <h1>{boardName}</h1>
          <button className="edit-title-btn" title="Редактировать название">
            <i className="fas fa-pencil-alt"></i>
          </button>
        </div>
        
        <div className="board-controls">
          <div className="board-view-controls">
            <button className="view-btn active">Канбан</button>
            <button className="view-btn">Календарь</button>
            <button className="view-btn">Список</button>
          </div>
          
          <div className="board-actions">
            <button 
              className={`filter-btn ${showFilters ? 'active' : ''}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <i className="fas fa-filter"></i> Фильтр
            </button>
            <button className="members-btn">
              <i className="fas fa-users"></i> Участники
            </button>
            <button className="settings-btn">
              <i className="fas fa-cog"></i>
            </button>
          </div>
        </div>
      </div>
      
      {showFilters && (
        <div className="board-filters">
          <div className="filter-group">
            <label>Исполнитель</label>
            <select>
              <option value="">Все</option>
              <option value="user-1">John Doe</option>
              <option value="user-2">Jane Smith</option>
              <option value="user-3">Alex Johnson</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Метки</label>
            <select>
              <option value="">Все</option>
              <option value="label-1">Backend</option>
              <option value="label-2">Frontend</option>
              <option value="label-3">Integration</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Приоритет</label>
            <select>
              <option value="">Все</option>
              <option value="high">Высокий</option>
              <option value="medium">Средний</option>
              <option value="low">Низкий</option>
            </select>
          </div>
          
          <button className="save-filter-btn">
            <i className="fas fa-save"></i> Сохранить фильтр
          </button>
          
          <button className="clear-filter-btn">
            <i className="fas fa-times"></i> Очистить
          </button>
        </div>
      )}
      
      <KanbanBoard boardId={id} />
    </div>
  );
};

export default BoardPage;