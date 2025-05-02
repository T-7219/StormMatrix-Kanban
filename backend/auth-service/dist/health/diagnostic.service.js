"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiagnosticService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
const operators_1 = require("rxjs/operators");
const rxjs_1 = require("rxjs");
let DiagnosticService = class DiagnosticService {
    constructor(httpService, configService) {
        this.httpService = httpService;
        this.configService = configService;
        this.developmentPhase = 'alpha';
        this.activeServices = [
            'auth-service',
            'board-service',
            'user-service',
            'notification-service',
            'file-service'
        ];
        this.serviceEndpoints = [
            { name: 'auth-service', url: 'http://auth-service:3001/api/v1/health/ping', phase: 'alpha' },
            { name: 'user-service', url: 'http://user-service:3002/api/v1/health/ping', phase: 'alpha' },
            { name: 'board-service', url: 'http://board-service:3003/api/v1/health/ping', phase: 'alpha' },
            { name: 'notification-service', url: 'http://notification-service:3004/api/v1/health/ping', phase: 'alpha' },
            { name: 'file-service', url: 'http://file-service:3005/api/v1/health/ping', phase: 'alpha' },
        ];
        this.apiEndpoints = [
            { name: 'auth-login', url: 'http://auth-service:3001/api/v1/auth/login', method: 'OPTIONS', phase: 'alpha' },
            { name: 'auth-register', url: 'http://auth-service:3001/api/v1/auth/register', method: 'OPTIONS', phase: 'alpha' },
            { name: 'auth-refresh', url: 'http://auth-service:3001/api/v1/auth/refresh', method: 'OPTIONS', phase: 'alpha' },
            { name: 'admin-endpoints', url: 'http://auth-service:3001/api/v1/admin', method: 'OPTIONS', phase: 'alpha' },
            { name: 'users-profile', url: 'http://user-service:3002/api/v1/users/profile', method: 'OPTIONS', phase: 'alpha' },
            { name: 'boards-list', url: 'http://board-service:3003/api/v1/boards', method: 'OPTIONS', phase: 'alpha' },
            { name: 'cards-list', url: 'http://board-service:3003/api/v1/cards', method: 'OPTIONS', phase: 'alpha' },
            { name: 'columns-list', url: 'http://board-service:3003/api/v1/columns', method: 'OPTIONS', phase: 'alpha' },
            { name: 'labels-list', url: 'http://board-service:3003/api/v1/labels', method: 'OPTIONS', phase: 'alpha' },
            { name: 'notifications-list', url: 'http://notification-service:3004/api/v1/notifications', method: 'OPTIONS', phase: 'alpha' },
            { name: 'attachments-list', url: 'http://file-service:3005/api/v1/attachments', method: 'OPTIONS', phase: 'alpha' },
            { name: 'attachments-upload', url: 'http://file-service:3005/api/v1/attachments/upload', method: 'OPTIONS', phase: 'alpha' },
            { name: 'api-docs', url: 'http://auth-service:3001/api/docs', method: 'GET', phase: 'alpha' },
        ];
    }
    checkServiceHealth() {
        const activeEndpoints = this.serviceEndpoints.filter(endpoint => endpoint.phase === this.developmentPhase || this.activeServices.includes(endpoint.name));
        const healthChecks = activeEndpoints.map(endpoint => {
            return this.httpService.get(endpoint.url).pipe((0, operators_1.map)((response) => ({
                service: endpoint.name,
                status: 'up',
                details: response.data,
            })), (0, operators_1.catchError)(error => (0, rxjs_1.of)({
                service: endpoint.name,
                status: 'down',
                error: error.message,
            })));
        });
        return healthChecks.length > 0 ? (0, rxjs_1.forkJoin)(healthChecks) : (0, rxjs_1.of)([]);
    }
    checkApiEndpoints() {
        const activeApiEndpoints = this.apiEndpoints.filter(endpoint => endpoint.phase === this.developmentPhase ||
            this.activeServices.includes(endpoint.url.split('://')[1].split(':')[0]));
        const apiChecks = activeApiEndpoints.map(endpoint => {
            return this.httpService.request({
                url: endpoint.url,
                method: endpoint.method,
            }).pipe((0, operators_1.map)((response) => ({
                endpoint: endpoint.name,
                url: endpoint.url,
                status: 'available',
                statusCode: response.status,
            })), (0, operators_1.catchError)(error => {
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    return (0, rxjs_1.of)({
                        endpoint: endpoint.name,
                        url: endpoint.url,
                        status: 'protected',
                        statusCode: error.response.status,
                    });
                }
                return (0, rxjs_1.of)({
                    endpoint: endpoint.name,
                    url: endpoint.url,
                    status: 'unavailable',
                    error: error.message,
                });
            }));
        });
        return apiChecks.length > 0 ? (0, rxjs_1.forkJoin)(apiChecks) : (0, rxjs_1.of)([]);
    }
    runFullDiagnostic() {
        return (0, rxjs_1.forkJoin)({
            timestamp: (0, rxjs_1.of)(new Date().toISOString()),
            services: this.checkServiceHealth(),
            endpoints: this.checkApiEndpoints(),
        });
    }
};
exports.DiagnosticService = DiagnosticService;
exports.DiagnosticService = DiagnosticService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService])
], DiagnosticService);
//# sourceMappingURL=diagnostic.service.js.map