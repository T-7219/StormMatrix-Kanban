import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsService {
  // Это временная реализация сервиса, которая будет расширена в будущем
  
  async findAll() {
    // Временная реализация
    return [
      {
        id: '1',
        userId: 'sample-user-id',
        message: 'Вы были добавлены на доску',
        read: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        userId: 'sample-user-id',
        message: 'На вас назначена новая карточка',
        read: true,
        createdAt: new Date().toISOString(),
      },
    ];
  }
  
  async countUnread() {
    // Временная реализация
    return { count: 1 };
  }
  
  async markAsRead(id: string) {
    // Временная реализация
    return { 
      id, 
      read: true,
      updatedAt: new Date().toISOString()
    };
  }
  
  async markAllAsRead() {
    // Временная реализация
    return { 
      success: true,
      count: 1,
      updatedAt: new Date().toISOString()
    };
  }
}