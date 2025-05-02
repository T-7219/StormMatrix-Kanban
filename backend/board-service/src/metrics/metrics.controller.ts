import { Controller, Get } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter, Gauge } from 'prom-client';

@Controller()
export class MetricsController {
  constructor(
    @InjectMetric('boards_created_total') private readonly boardsCreatedCounter: Counter<string>,
    @InjectMetric('cards_created_total') private readonly cardsCreatedCounter: Counter<string>,
    @InjectMetric('active_boards') private readonly activeBoardsGauge: Gauge<string>,
    @InjectMetric('card_movements_total') private readonly cardMovementsCounter: Counter<string>
  ) {
    // Set sample values for demo purposes
    this.activeBoardsGauge.set(5);
  }

  @Get('metrics')
  @ApiExcludeEndpoint()
  getMetrics() {
    // The metrics endpoint is handled by the Prometheus module
    // This method exists just to document it in code
    return '';
  }

  // Public methods for other services to update metrics
  incrementBoardCreated() {
    this.boardsCreatedCounter.inc();
  }

  incrementCardCreated() {
    this.cardsCreatedCounter.inc();
  }

  incrementCardMovement() {
    this.cardMovementsCounter.inc();
  }

  updateActiveBoards(count: number) {
    this.activeBoardsGauge.set(count);
  }
}