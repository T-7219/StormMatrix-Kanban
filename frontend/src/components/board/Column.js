import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Card from './Card';
import './Column.css';

const Column = ({ 
  column, 
  cards, 
  onCardClick, 
  onAddCard 
}) => {
  const isOverLimit = column.limit !== null && cards.length > column.limit;
  
  // Обработчик клика на кнопку добавления карточки
  const handleAddCardClick = () => {
    if (onAddCard) {
      onAddCard(column.id);
    }
  };

  return (
    <div className="kanban-column">
      <div className="column-header">
        <h3>{column.title}</h3>
        <div className={`column-counter ${isOverLimit ? 'over-limit' : ''}`}>
          {cards.length} {column.limit !== null && `/ ${column.limit}`}
        </div>
      </div>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            className={`column-cards ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {cards.map((card, index) => (
              <Draggable key={card.id} draggableId={card.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`card-container ${snapshot.isDragging ? 'dragging' : ''}`}
                  >
                    <Card card={card} onClick={onCardClick} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            {cards.length === 0 && (
              <div className="empty-column-message">
                Нет карточек
              </div>
            )}
          </div>
        )}
      </Droppable>
      <div className="column-footer">
        <button 
          className="add-card-button"
          onClick={handleAddCardClick}
        >
          + Добавить карточку
        </button>
      </div>
    </div>
  );
};

export default Column;