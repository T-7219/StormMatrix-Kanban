import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('root')
@Controller()
export class AppController {
  @Get()
  @ApiOperation({ summary: 'Get API overview and status' })
  getApiInfo() {
    return {
      service: 'StormMatrix Kanban - Auth Service',
      status: 'operational',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      endpoints: {
        auth: '/api/v1/auth',
        health: '/api/v1/health',
        admin: '/api/v1/admin',
        metrics: '/api/v1/metrics',
        docs: '/api/docs',
      }
    };
  }
}