import { Counter, Gauge } from 'prom-client';
export declare class MetricsController {
    private readonly loginAttemptsCounter;
    private readonly activeUsersGauge;
    private readonly registrationsCounter;
    private readonly failedLoginAttemptsCounter;
    constructor(loginAttemptsCounter: Counter<string>, activeUsersGauge: Gauge<string>, registrationsCounter: Counter<string>, failedLoginAttemptsCounter: Counter<string>);
    getMetrics(): string;
    incrementLoginAttempt(): void;
    incrementFailedLoginAttempt(): void;
    incrementRegistration(): void;
    updateActiveUsers(count: number): void;
}
