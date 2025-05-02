import { HealthCheckService, TypeOrmHealthIndicator, MemoryHealthIndicator, DiskHealthIndicator } from '@nestjs/terminus';
import { DiagnosticService } from './diagnostic.service';
import { Observable } from 'rxjs';
export declare class HealthController {
    private health;
    private db;
    private memory;
    private disk;
    private diagnosticService;
    constructor(health: HealthCheckService, db: TypeOrmHealthIndicator, memory: MemoryHealthIndicator, disk: DiskHealthIndicator, diagnosticService: DiagnosticService);
    check(): Promise<import("@nestjs/terminus").HealthCheckResult>;
    liveness(): {
        status: string;
        timestamp: string;
    };
    readiness(): Promise<import("@nestjs/terminus").HealthCheckResult>;
    runDiagnostic(): Observable<any>;
    getApiList(): {
        apiEndpoints: {
            service: string;
            baseUrl: string;
            endpoints: {
                path: string;
                method: string;
                description: string;
            }[];
        }[];
    };
    ping(): {
        status: string;
        service: string;
        timestamp: string;
    };
}
