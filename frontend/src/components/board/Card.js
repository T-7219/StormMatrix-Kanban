import React from 'react';
import './Card.css';

const priorityColors = {
  high: '#eb5a46',
  medium: '#f2d600',
  low: '#61bd4f',
};

const Card = ({ card, onClick }) => {
  // Функция для форматирования даты
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
  };

  // Функция для проверки, близок ли дедлайн
  const isDeadlineNear = (dateString) => {
    const deadline = new Date(dateString);
    const today = new Date();
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3 && diffDays >= 0;
  };

  // Функция для проверки, просрочен ли дедлайн
  const isDeadlinePassed = (dateString) => {
    const deadline = new Date(dateString);
    const today = new Date();
    return deadline < today;
  };

  // Обработчик клика по карточке
  const handleCardClick = (e) => {
    if (onClick) {
      onClick(card);
    }
  };

  return (
    <div className="kanban-card" onClick={handleCardClick}>
      {/* Метки */}
      {card.labels && card.labels.length > 0 && (
        <div className="card-labels">
          {card.labels.map((label) => (
            <div 
              key={label.id} 
              className="card-label" 
              style={{ backgroundColor: label.color }}
              title={label.name}
            >
              {label.name}
            </div>
          ))}
        </div>
      )}

      {/* Заголовок */}
      <h4 className="card-title">{card.title}</h4>

      {/* Описание (показываем только краткую версию) */}
      {card.description && (
        <p className="card-description">
          {card.description.length > 80
            ? `${card.description.substring(0, 80)}...`
            : card.description}
        </p>
      )}

      {/* Нижняя часть карточки - метаданные */}
      <div className="card-meta">
        {/* Приоритет */}
        {card.priority && (
          <div 
            className="card-priority" 
            style={{ backgroundColor: priorityColors[card.priority] }}
            title={`Приоритет: ${card.priority}`}
          >
            {card.priority.charAt(0).toUpperCase()}
          </div>
        )}

        {/* Дата выполнения */}
        {card.dueDate && (
          <div 
            className={`card-due-date ${
              isDeadlinePassed(card.dueDate) 
                ? 'overdue' 
                : isDeadlineNear(card.dueDate) 
                  ? 'near' 
                  : ''
            }`}
            title="Срок выполнения"
          >
            {formatDate(card.dueDate)}
          </div>
        )}

        {/* Исполнитель */}
        {card.assignee && (
          <div className="card-assignee" title={`Исполнитель: ${card.assignee.name}`}>
            {card.assignee.avatar ? (
              <img 
                src={card.assignee.avatar} 
                alt={card.assignee.name} 
                className="assignee-avatar" 
              />
            ) : (
              <div className="assignee-initials">
                {card.assignee.name.charAt(0)}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;