import { HealthCheckService, TypeOrmHealthIndicator, MemoryHealthIndicator, DiskHealthIndicator } from '@nestjs/terminus';
export declare class HealthController {
    private health;
    private db;
    private memory;
    private disk;
    constructor(health: HealthCheckService, db: TypeOrmHealthIndicator, memory: MemoryHealthIndicator, disk: DiskHealthIndicator);
    check(): Promise<import("@nestjs/terminus").HealthCheckResult>;
    ping(): {
        status: string;
        service: string;
        timestamp: string;
    };
    liveness(): {
        status: string;
        timestamp: string;
    };
    readiness(): Promise<import("@nestjs/terminus").HealthCheckResult>;
}
