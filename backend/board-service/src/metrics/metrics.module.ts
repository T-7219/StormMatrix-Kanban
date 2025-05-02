import { Module } from '@nestjs/common';
import { MetricsController } from './metrics.controller';
import { PrometheusModule, makeCounterProvider, makeGaugeProvider } from '@willsoto/nestjs-prometheus';

@Module({
  imports: [
    PrometheusModule.register({
      path: '/metrics',
      defaultMetrics: {
        enabled: true,
      },
    }),
  ],
  controllers: [MetricsController],
  providers: [
    makeCounterProvider({
      name: 'boards_created_total',
      help: 'Total number of boards created',
    }),
    makeCounterProvider({
      name: 'cards_created_total',
      help: 'Total number of cards created',
    }),
    makeGaugeProvider({
      name: 'active_boards',
      help: 'Number of active boards',
    }),
    makeCounterProvider({
      name: 'card_movements_total',
      help: 'Total number of card movements between columns',
    }),
  ],
})
export class MetricsModule {}