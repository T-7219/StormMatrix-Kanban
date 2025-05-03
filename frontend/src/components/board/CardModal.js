import React, { useState, useEffect } from 'react';
import './CardModal.css';

const CardModal = ({ 
  card, 
  isOpen, 
  onClose, 
  onSave, 
  onDelete, 
  columnName, 
  labels = [], 
  users = [] 
}) => {
  const [editMode, setEditMode] = useState(!card?.id); // Если новая карточка, сразу режим редактирования
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
    assigneeId: '',
    labels: []
  });

  useEffect(() => {
    // Инициализация формы при открытии модального окна
    if (card) {
      setFormData({
        title: card.title || '',
        description: card.description || '',
        priority: card.priority || 'medium',
        dueDate: card.dueDate ? new Date(card.dueDate).toISOString().substr(0, 10) : '',
        assigneeId: card.assignee?.id || '',
        labels: card.labels?.map(label => label.id) || []
      });
    } else {
      // Сброс формы для новой карточки
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        dueDate: '',
        assigneeId: '',
        labels: []
      });
    }
  }, [card]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLabelChange = (labelId) => {
    const currentLabels = [...formData.labels];
    const labelIndex = currentLabels.indexOf(labelId);
    
    if (labelIndex === -1) {
      currentLabels.push(labelId);
    } else {
      currentLabels.splice(labelIndex, 1);
    }
    
    setFormData({ ...formData, labels: currentLabels });
  };

  const handleSave = () => {
    const updatedCard = {
      ...card,
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
      dueDate: formData.dueDate ? new Date(formData.dueDate).toISOString() : null,
      assignee: formData.assigneeId ? users.find(u => u.id === formData.assigneeId) : null,
      labels: formData.labels.map(labelId => labels.find(l => l.id === labelId))
    };
    
    onSave(updatedCard);
    setEditMode(false);
  };

  const handleDelete = () => {
    if (window.confirm('Вы уверены, что хотите удалить эту карточку?')) {
      onDelete(card.id);
    }
  };

  const handleCancel = () => {
    if (card?.id) {
      // Возврат к просмотру для существующей карточки
      setEditMode(false);
      setFormData({
        title: card.title || '',
        description: card.description || '',
        priority: card.priority || 'medium',
        dueDate: card.dueDate ? new Date(card.dueDate).toISOString().substr(0, 10) : '',
        assigneeId: card.assignee?.id || '',
        labels: card.labels?.map(label => label.id) || []
      });
    } else {
      // Закрытие модального окна для новой карточки
      onClose();
    }
  };

  const priorityColors = {
    high: '#eb5a46',
    medium: '#f2d600',
    low: '#61bd4f'
  };

  // Форматирование даты для отображения
  const formatDate = (dateString) => {
    if (!dateString) return 'Не установлен';
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  // Проверка, просрочен ли дедлайн
  const isDeadlinePassed = (dateString) => {
    if (!dateString) return false;
    const deadline = new Date(dateString);
    const today = new Date();
    return deadline < today;
  };

  return (
    <div className="card-modal-overlay" onClick={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}>
      <div className="card-modal">
        <div className="card-modal-header">
          {columnName && <div className="card-column-badge">{columnName}</div>}
          <button className="modal-close-button" onClick={onClose}>&times;</button>
        </div>
        
        <div className="card-modal-content">
          {editMode ? (
            /* Форма редактирования */
            <div className="card-edit-form">
              <div className="form-group">
                <label htmlFor="card-title">Заголовок</label>
                <input
                  id="card-title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Введите заголовок карточки"
                  autoFocus
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="card-description">Описание</label>
                <textarea
                  id="card-description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Добавьте описание задачи..."
                  rows={5}
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="card-priority">Приоритет</label>
                  <select
                    id="card-priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                  >
                    <option value="high">Высокий</option>
                    <option value="medium">Средний</option>
                    <option value="low">Низкий</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="card-due-date">Срок выполнения</label>
                  <input
                    id="card-due-date"
                    name="dueDate"
                    type="date"
                    value={formData.dueDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              {users.length > 0 && (
                <div className="form-group">
                  <label htmlFor="card-assignee">Исполнитель</label>
                  <select
                    id="card-assignee"
                    name="assigneeId"
                    value={formData.assigneeId}
                    onChange={handleInputChange}
                  >
                    <option value="">Не назначен</option>
                    {users.map(user => (
                      <option key={user.id} value={user.id}>{user.name}</option>
                    ))}
                  </select>
                </div>
              )}
              
              {labels.length > 0 && (
                <div className="form-group">
                  <label>Метки</label>
                  <div className="label-checkboxes">
                    {labels.map(label => (
                      <div key={label.id} className="label-checkbox">
                        <input
                          type="checkbox"
                          id={`label-${label.id}`}
                          checked={formData.labels.includes(label.id)}
                          onChange={() => handleLabelChange(label.id)}
                        />
                        <label 
                          htmlFor={`label-${label.id}`}
                          className="label-option"
                          style={{ backgroundColor: label.color }}
                        >
                          {label.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Просмотр карточки */
            <div className="card-view-content">
              <h2 className="card-title">{card.title}</h2>
              
              {card.labels && card.labels.length > 0 && (
                <div className="card-labels-container">
                  {card.labels.map(label => (
                    <span
                      key={label.id}
                      className="card-label"
                      style={{ backgroundColor: label.color }}
                    >
                      {label.name}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="card-description-container">
                <h4>Описание</h4>
                {card.description ? (
                  <p className="card-description">{card.description}</p>
                ) : (
                  <p className="no-description">Нет описания</p>
                )}
              </div>
              
              <div className="card-details">
                {card.priority && (
                  <div className="card-detail">
                    <span className="detail-label">Приоритет:</span>
                    <span 
                      className="priority-badge" 
                      style={{ backgroundColor: priorityColors[card.priority] }}
                    >
                      {card.priority === 'high' ? 'Высокий' : 
                       card.priority === 'medium' ? 'Средний' : 'Низкий'}
                    </span>
                  </div>
                )}
                
                <div className="card-detail">
                  <span className="detail-label">Срок выполнения:</span>
                  <span className={isDeadlinePassed(card.dueDate) ? 'overdue' : ''}>
                    {formatDate(card.dueDate)}
                  </span>
                </div>
                
                {card.assignee && (
                  <div className="card-detail">
                    <span className="detail-label">Исполнитель:</span>
                    <div className="assignee-info">
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
                      <span>{card.assignee.name}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        <div className="card-modal-footer">
          {editMode ? (
            /* Кнопки для режима редактирования */
            <>
              {card?.id && (
                <button className="modal-button delete-button" onClick={handleDelete}>
                  Удалить
                </button>
              )}
              <button className="modal-button cancel-button" onClick={handleCancel}>
                Отмена
              </button>
              <button 
                className="modal-button save-button" 
                onClick={handleSave}
                disabled={!formData.title.trim()}
              >
                Сохранить
              </button>
            </>
          ) : (
            /* Кнопки для режима просмотра */
            <button className="modal-button edit-button" onClick={() => setEditMode(true)}>
              Редактировать
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardModal;