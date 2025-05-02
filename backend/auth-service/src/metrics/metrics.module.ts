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
      name: 'login_attempts_total',
      help: 'Total number of login attempts',
    }),
    makeGaugeProvider({
      name: 'active_users',
      help: 'Number of currently active users',
    }),
    makeCounterProvider({
      name: 'registrations_total',
      help: 'Total number of user registrations',
    }),
    makeCounterProvider({
      name: 'failed_login_attempts_total',
      help: 'Total number of failed login attempts',
    }),
  ],
})
export class MetricsModule {}