import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { map, catchError } from 'rxjs/operators';
import { Observable, of, forkJoin } from 'rxjs';

@Injectable()
export class DiagnosticService {
  // Определяем фазу разработки системы
  private readonly developmentPhase = 'alpha'; // 'alpha', 'beta', 'production'
  
  // Определяем активные сервисы, которые должны быть проверены
  private readonly activeServices = [
    'auth-service', 
    'board-service',
    'user-service',
    'notification-service',
    'file-service'
  ];
  
  // Определяем эндпоинты для проверки состояния сервисов
  private readonly serviceEndpoints = [
    // Используем ping-эндпоинты для более надежной проверки
    { name: 'auth-service', url: 'http://auth-service:3001/api/v1/health/ping', phase: 'alpha' },
    { name: 'user-service', url: 'http://user-service:3002/api/v1/health/ping', phase: 'alpha' },
    { name: 'board-service', url: 'http://board-service:3003/api/v1/health/ping', phase: 'alpha' },
    { name: 'notification-service', url: 'http://notification-service:3004/api/v1/health/ping', phase: 'alpha' },
    { name: 'file-service', url: 'http://file-service:3005/api/v1/health/ping', phase: 'alpha' },
  ];
  
  // Определяем API эндпоинты для проверки
  private readonly apiEndpoints = [
    // Auth Service (alpha)
    { name: 'auth-login', url: 'http://auth-service:3001/api/v1/auth/login', method: 'OPTIONS', phase: 'alpha' },
    { name: 'auth-register', url: 'http://auth-service:3001/api/v1/auth/register', method: 'OPTIONS', phase: 'alpha' },
    { name: 'auth-refresh', url: 'http://auth-service:3001/api/v1/auth/refresh', method: 'OPTIONS', phase: 'alpha' },
    { name: 'admin-endpoints', url: 'http://auth-service:3001/api/v1/admin', method: 'OPTIONS', phase: 'alpha' },
    
    // User Service (alpha)
    { name: 'users-profile', url: 'http://user-service:3002/api/v1/users/profile', method: 'OPTIONS', phase: 'alpha' },
    
    // Board Service (alpha)
    { name: 'boards-list', url: 'http://board-service:3003/api/v1/boards', method: 'OPTIONS', phase: 'alpha' },
    { name: 'cards-list', url: 'http://board-service:3003/api/v1/cards', method: 'OPTIONS', phase: 'alpha' },
    { name: 'columns-list', url: 'http://board-service:3003/api/v1/columns', method: 'OPTIONS', phase: 'alpha' },
    { name: 'labels-list', url: 'http://board-service:3003/api/v1/labels', method: 'OPTIONS', phase: 'alpha' },
    
    // Notification Service (alpha)
    { name: 'notifications-list', url: 'http://notification-service:3004/api/v1/notifications', method: 'OPTIONS', phase: 'alpha' },
    
    // File Service (alpha)
    { name: 'attachments-list', url: 'http://file-service:3005/api/v1/attachments', method: 'OPTIONS', phase: 'alpha' },
    { name: 'attachments-upload', url: 'http://file-service:3005/api/v1/attachments/upload', method: 'OPTIONS', phase: 'alpha' },
    
    // Swagger Docs (alpha)
    { name: 'api-docs', url: 'http://auth-service:3001/api/docs', method: 'GET', phase: 'alpha' },
  ];
  
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}
  
  checkServiceHealth(): Observable<any> {
    // Фильтруем только те сервисы, которые должны быть активны в текущей фазе разработки
    const activeEndpoints = this.serviceEndpoints.filter(
      endpoint => endpoint.phase === this.developmentPhase || this.activeServices.includes(endpoint.name)
    );
    
    const healthChecks = activeEndpoints.map(endpoint => {
      return this.httpService.get(endpoint.url).pipe(
        map((response: AxiosResponse) => ({
          service: endpoint.name,
          status: 'up',
          details: response.data,
        })),
        catchError(error => of({
          service: endpoint.name,
          status: 'down',
          error: error.message,
        })),
      );
    });
    
    return healthChecks.length > 0 ? forkJoin(healthChecks) : of([]);
  }
  
  checkApiEndpoints(): Observable<any> {
    // Фильтруем только те эндпоинты, которые должны быть активны в текущей фазе разработки
    const activeApiEndpoints = this.apiEndpoints.filter(
      endpoint => endpoint.phase === this.developmentPhase || 
      this.activeServices.includes(endpoint.url.split('://')[1].split(':')[0])
    );
    
    const apiChecks = activeApiEndpoints.map(endpoint => {
      return this.httpService.request({
        url: endpoint.url,
        method: endpoint.method,
      }).pipe(
        map((response: AxiosResponse) => ({
          endpoint: endpoint.name,
          url: endpoint.url,
          status: 'available',
          statusCode: response.status,
        })),
        catchError(error => {
          // If we get a 401, that means the endpoint exists but requires auth
          if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            return of({
              endpoint: endpoint.name,
              url: endpoint.url,
              status: 'protected',
              statusCode: error.response.status,
            });
          }
          
          return of({
            endpoint: endpoint.name,
            url: endpoint.url,
            status: 'unavailable',
            error: error.message,
          });
        }),
      );
    });
    
    return apiChecks.length > 0 ? forkJoin(apiChecks) : of([]);
  }
  
  runFullDiagnostic(): Observable<any> {
    return forkJoin({
      timestamp: of(new Date().toISOString()),
      services: this.checkServiceHealth(),
      endpoints: this.checkApiEndpoints(),
    });
  }
}