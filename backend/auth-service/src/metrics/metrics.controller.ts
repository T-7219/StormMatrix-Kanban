import { Controller, Get } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter, Gauge } from 'prom-client';

@Controller()
export class MetricsController {
  constructor(
    @InjectMetric('login_attempts_total') private readonly loginAttemptsCounter: Counter<string>,
    @InjectMetric('active_users') private readonly activeUsersGauge: Gauge<string>,
    @InjectMetric('registrations_total') private readonly registrationsCounter: Counter<string>,
    @InjectMetric('failed_login_attempts_total') private readonly failedLoginAttemptsCounter: Counter<string>
  ) {
    // Set sample values for demo purposes
    this.activeUsersGauge.set(10);
  }

  @Get('metrics')
  @ApiExcludeEndpoint()
  getMetrics() {
    // The metrics endpoint is handled by the Prometheus module
    // This method exists just to document it in code
    return '';
  }

  // Public methods for other services to update metrics
  incrementLoginAttempt() {
    this.loginAttemptsCounter.inc();
  }

  incrementFailedLoginAttempt() {
    this.failedLoginAttemptsCounter.inc();
  }

  incrementRegistration() {
    this.registrationsCounter.inc();
  }

  updateActiveUsers(count: number) {
    this.activeUsersGauge.set(count);
  }
}