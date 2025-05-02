import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('root')
@Controller()
export class AppController {
  @Get()
  @ApiOperation({ summary: 'Get API overview and status' })
  getApiInfo() {
    return {
      service: 'StormMatrix Kanban - Board Service',
      status: 'operational',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      endpoints: {
        boards: '/api/v1/boards',
        cards: '/api/v1/cards',
        columns: '/api/v1/columns',
        labels: '/api/v1/labels',
        health: '/api/v1/health',
        metrics: '/api/v1/metrics',
        docs: '/api/docs',
      }
    };
  }
}