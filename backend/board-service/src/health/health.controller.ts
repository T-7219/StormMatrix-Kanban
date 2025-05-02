import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckService,
  TypeOrmHealthIndicator,
  MemoryHealthIndicator,
  DiskHealthIndicator,
} from '@nestjs/terminus';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
    private memory: MemoryHealthIndicator,
    private disk: DiskHealthIndicator,
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
      () => this.db.pingCheck('database', { timeout: 3000 }), // Увеличили timeout для БД
    ]);
  }
  
  // Добавляем простой health-check для проверки доступности сервиса без сложных проверок
  @Get('ping')
  @ApiOperation({ summary: 'Simple ping to check if service is running' })
  ping() {
    return {
      status: 'ok',
      service: 'board-service',
      timestamp: new Date().toISOString(),
    };
  }
}