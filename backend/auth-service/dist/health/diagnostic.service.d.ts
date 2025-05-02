import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
export declare class DiagnosticService {
    private readonly httpService;
    private readonly configService;
    private readonly developmentPhase;
    private readonly activeServices;
    private readonly serviceEndpoints;
    private readonly apiEndpoints;
    constructor(httpService: HttpService, configService: ConfigService);
    checkServiceHealth(): Observable<any>;
    checkApiEndpoints(): Observable<any>;
    runFullDiagnostic(): Observable<any>;
}
