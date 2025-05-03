import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Column from './Column';
import './KanbanBoard.css';

const KanbanBoard = ({ boardId }) => {
  const [columns, setColumns] = useState([]);
  const [cards, setCards] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // В реальном приложении здесь будет API запрос
    // к board-service для получения данных доски
    const fetchBoardData = async () => {
      try {
        setLoading(true);
        // Заглушка для демонстрации UI
        // В реальном приложении: const response = await axios.get(`/api/v1/boards/${boardId}`);
        
        // Имитация данных с сервера
        const mockData = {
          columns: [
            { id: 'col-1', title: 'To Do', limit: 5, order: 1 },
            { id: 'col-2', title: 'In Progress', limit: 3, order: 2 },
            { id: 'col-3', title: 'Code Review', limit: 2, order: 3 },
            { id: 'col-4', title: 'Done', limit: null, order: 4 }
          ],
          cards: {
            'col-1': [
              { 
                id: 'card-1', 
                title: 'Разработка модуля авторизации', 
                description: 'Реализовать JWT аутентификацию',
                priority: 'high',
                dueDate: '2025-05-15T00:00:00.000Z',
                assignee: { id: 'user-1', name: 'John Doe', avatar: 'https://i.pravatar.cc/150?img=1' },
                labels: [{ id: 'label-1', name: 'Backend', color: '#61bd4f' }]
              },
              { 
                id: 'card-2', 
                title: 'Создание компонентов UI', 
                description: 'Разработать базовые компоненты для интерфейса',
                priority: 'medium',
                dueDate: '2025-05-20T00:00:00.000Z',
                assignee: { id: 'user-2', name: 'Jane Smith', avatar: 'https://i.pravatar.cc/150?img=2' },
                labels: [{ id: 'label-2', name: 'Frontend', color: '#ff9f1a' }]
              }
            ],
            'col-2': [
              { 
                id: 'card-3', 
                title: 'Интеграция с API', 
                description: 'Подключить фронтенд к бэкенд API',
                priority: 'high',
                dueDate: '2025-05-10T00:00:00.000Z',
                assignee: { id: 'user-3', name: 'Alex Johnson', avatar: 'https://i.pravatar.cc/150?img=3' },
                labels: [{ id: 'label-3', name: 'Integration', color: '#c377e0' }]
              }
            ],
            'col-3': [
              { 
                id: 'card-4', 
                title: 'Тестирование оповещений', 
                description: 'Проверить работу системы оповещений',
                priority: 'low',
                dueDate: '2025-05-12T00:00:00.000Z',
                assignee: { id: 'user-4', name: 'Sarah Brown', avatar: 'https://i.pravatar.cc/150?img=4' },
                labels: [{ id: 'label-4', name: 'QA', color: '#eb5a46' }]
              }
            ],
            'col-4': [
              { 
                id: 'card-5', 
                title: 'Настройка CI/CD', 
                description: 'Конфигурация автоматического деплоя',
                priority: 'medium',
                dueDate: '2025-05-05T00:00:00.000Z',
                assignee: { id: 'user-5', name: 'Mike Wilson', avatar: 'https://i.pravatar.cc/150?img=5' },
                labels: [{ id: 'label-5', name: 'DevOps', color: '#0079bf' }]
              }
            ]
          }
        };

        setColumns(mockData.columns);
        setCards(mockData.cards);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching board data:", err);
        setError("Failed to load board data. Please try again.");
        setLoading(false);
      }
    };

    fetchBoardData();
  }, [boardId]);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // Если нет destination (например, перетащили за пределы доски), то ничего не делаем
    if (!destination) {
      return;
    }

    // Если карточка была перемещена в то же самое место, ничего не делаем
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceColumn = source.droppableId;
    const destinationColumn = destination.droppableId;
    
    // Копируем массивы карточек
    const sourceCards = Array.from(cards[sourceColumn]);
    const destCards = sourceColumn === destinationColumn
      ? sourceCards
      : Array.from(cards[destinationColumn]);
    
    // Удаляем карточку из исходного массива
    const [movedCard] = sourceCards.splice(source.index, 1);
    
    // Добавляем карточку в новое место
    if (sourceColumn === destinationColumn) {
      // Перемещение в рамках одной колонки
      sourceCards.splice(destination.index, 0, movedCard);
      
      setCards({
        ...cards,
        [sourceColumn]: sourceCards,
      });
    } else {
      // Перемещение между колонками
      destCards.splice(destination.index, 0, movedCard);
      
      setCards({
        ...cards,
        [sourceColumn]: sourceCards,
        [destinationColumn]: destCards,
      });
      
      // В реальном приложении здесь был бы API запрос на обновление позиции карточки
      // axios.patch(`/api/v1/cards/${draggableId}`, { columnId: destinationColumn, position: destination.index });
    }
  };

  if (loading) {
    return <div className="loading-state">Loading board...</div>;
  }

  if (error) {
    return <div className="error-state">Error: {error}</div>;
  }

  return (
    <div className="kanban-board">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="board-columns">
          {columns.map((column) => (
            <Column 
              key={column.id} 
              column={column} 
              cards={cards[column.id] || []} 
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;