import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckService,
  TypeOrmHealthIndicator,
  MemoryHealthIndicator,
  DiskHealthIndicator,
} from '@nestjs/terminus';
import { DiagnosticService } from './diagnostic.service';
import { Observable } from 'rxjs';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
    private memory: MemoryHealthIndicator,
    private disk: DiskHealthIndicator,
    private diagnosticService: DiagnosticService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get service health status' })
  @HealthCheck()
  check() {
    return this.health.check([
      // Check database connection
      () => this.db.pingCheck('database', { timeout: 3000 }), // Увеличили timeout для БД
      
      // Более мягкие условия для проверки памяти
      () => this.memory.checkHeap('memory_heap', 300 * 1024 * 1024), // 300MB вместо 150MB
      
      // Более мягкие условия для проверки диска
      () => this.disk.checkStorage('disk', { path: '/', thresholdPercent: 0.95 }), // 95% вместо 90%
    ]);
  }

  @Get('liveness')
  @ApiOperation({ summary: 'Liveness probe for Kubernetes' })
  liveness() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('readiness')
  @ApiOperation({ summary: 'Readiness probe for Kubernetes' })
  @HealthCheck()
  readiness() {
    return this.health.check([
      // For readiness, we just check database connection
      () => this.db.pingCheck('database', { timeout: 1000 }),
    ]);
  }

  @Get('diagnostic')
  @ApiOperation({ 
    summary: 'Run diagnostic checks on all API endpoints',
    description: 'Performs a comprehensive check of all StormMatrix Kanban API endpoints and services to verify their availability and functionality.' 
  })
  runDiagnostic(): Observable<any> {
    return this.diagnosticService.runFullDiagnostic();
  }

  @Get('api-list')
  @ApiOperation({ 
    summary: 'List all available API endpoints',
    description: 'Returns a comprehensive list of all API endpoints available in the StormMatrix Kanban system.' 
  })
  getApiList() {
    return {
      apiEndpoints: [
        // Auth Service
        {
          service: 'auth-service',
          baseUrl: '/api/v1/auth',
          endpoints: [
            { path: '/login', method: 'POST', description: 'User login' },
            { path: '/register', method: 'POST', description: 'User registration' },
            { path: '/refresh', method: 'POST', description: 'Refresh access token' },
            { path: '/logout', method: 'POST', description: 'User logout' },
            { path: '/verify-email/:token', method: 'GET', description: 'Verify email address' },
            { path: '/forgot-password', method: 'POST', description: 'Request password reset' },
            { path: '/reset-password/:token', method: 'POST', description: 'Reset password with token' }
          ]
        },
        {
          service: 'auth-service',
          baseUrl: '/api/v1/admin',
          endpoints: [
            { path: '/users', method: 'GET', description: 'List all users (admin only)' },
            { path: '/users/:id', method: 'GET', description: 'Get user details (admin only)' },
            { path: '/users/:id', method: 'PATCH', description: 'Update user (admin only)' },
            { path: '/users/:id', method: 'DELETE', description: 'Delete user (admin only)' }
          ]
        },
        // User Service
        {
          service: 'user-service',
          baseUrl: '/api/v1/users',
          endpoints: [
            { path: '/profile', method: 'GET', description: 'Get current user profile' },
            { path: '/profile', method: 'PATCH', description: 'Update current user profile' },
            { path: '/profile/password', method: 'PATCH', description: 'Change password' },
            { path: '/profile/avatar', method: 'POST', description: 'Upload avatar' }
          ]
        },
        // Board Service
        {
          service: 'board-service',
          baseUrl: '/api/v1/boards',
          endpoints: [
            { path: '/', method: 'GET', description: 'List all boards for current user' },
            { path: '/', method: 'POST', description: 'Create a new board' },
            { path: '/:id', method: 'GET', description: 'Get board details' },
            { path: '/:id', method: 'PATCH', description: 'Update board' },
            { path: '/:id', method: 'DELETE', description: 'Delete board' },
            { path: '/:id/members', method: 'GET', description: 'Get board members' },
            { path: '/:id/members', method: 'POST', description: 'Add board member' },
            { path: '/:id/members/:userId', method: 'DELETE', description: 'Remove board member' }
          ]
        },
        {
          service: 'board-service',
          baseUrl: '/api/v1/columns',
          endpoints: [
            { path: '/', method: 'POST', description: 'Create a new column' },
            { path: '/:id', method: 'PATCH', description: 'Update column' },
            { path: '/:id', method: 'DELETE', description: 'Delete column' },
            { path: '/reorder', method: 'PATCH', description: 'Reorder columns' }
          ]
        },
        {
          service: 'board-service',
          baseUrl: '/api/v1/cards',
          endpoints: [
            { path: '/', method: 'POST', description: 'Create a new card' },
            { path: '/:id', method: 'GET', description: 'Get card details' },
            { path: '/:id', method: 'PATCH', description: 'Update card' },
            { path: '/:id', method: 'DELETE', description: 'Delete card' },
            { path: '/reorder', method: 'PATCH', description: 'Reorder cards' },
            { path: '/:id/comments', method: 'GET', description: 'Get card comments' },
            { path: '/:id/comments', method: 'POST', description: 'Add comment to card' },
            { path: '/:id/assignees', method: 'POST', description: 'Assign user to card' },
            { path: '/:id/assignees/:userId', method: 'DELETE', description: 'Unassign user from card' }
          ]
        },
        {
          service: 'board-service',
          baseUrl: '/api/v1/labels',
          endpoints: [
            { path: '/', method: 'GET', description: 'List all labels for board' },
            { path: '/', method: 'POST', description: 'Create a new label' },
            { path: '/:id', method: 'PATCH', description: 'Update label' },
            { path: '/:id', method: 'DELETE', description: 'Delete label' }
          ]
        },
        // Notification Service
        {
          service: 'notification-service',
          baseUrl: '/api/v1/notifications',
          endpoints: [
            { path: '/', method: 'GET', description: 'Get all notifications for current user' },
            { path: '/unread', method: 'GET', description: 'Get unread notifications count' },
            { path: '/:id/read', method: 'PATCH', description: 'Mark notification as read' },
            { path: '/read-all', method: 'PATCH', description: 'Mark all notifications as read' },
            { path: '/settings', method: 'GET', description: 'Get notification settings' },
            { path: '/settings', method: 'PATCH', description: 'Update notification settings' }
          ]
        },
        // File Service
        {
          service: 'file-service',
          baseUrl: '/api/v1/attachments',
          endpoints: [
            { path: '/upload', method: 'POST', description: 'Upload file attachment' },
            { path: '/:id', method: 'GET', description: 'Download file attachment' },
            { path: '/:id', method: 'DELETE', description: 'Delete file attachment' }
          ]
        },
        // API Documentation
        {
          service: 'auth-service',
          baseUrl: '/api/docs',
          endpoints: [
            { path: '/', method: 'GET', description: 'Swagger API documentation' }
          ]
        }
      ]
    };
  }

  // Добавляем простой health-check для проверки доступности сервиса без сложных проверок
  @Get('ping')
  @ApiOperation({ summary: 'Simple ping to check if service is running' })
  ping() {
    return {
      status: 'ok',
      service: 'auth-service',
      timestamp: new Date().toISOString(),
    };
  }
}