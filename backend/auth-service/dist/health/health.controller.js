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
exports.HealthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const terminus_1 = require("@nestjs/terminus");
const diagnostic_service_1 = require("./diagnostic.service");
const rxjs_1 = require("rxjs");
let HealthController = class HealthController {
    constructor(health, db, memory, disk, diagnosticService) {
        this.health = health;
        this.db = db;
        this.memory = memory;
        this.disk = disk;
        this.diagnosticService = diagnosticService;
    }
    check() {
        return this.health.check([
            () => this.db.pingCheck('database', { timeout: 3000 }),
            () => this.memory.checkHeap('memory_heap', 300 * 1024 * 1024),
            () => this.disk.checkStorage('disk', { path: '/', thresholdPercent: 0.95 }),
        ]);
    }
    liveness() {
        return {
            status: 'ok',
            timestamp: new Date().toISOString(),
        };
    }
    readiness() {
        return this.health.check([
            () => this.db.pingCheck('database', { timeout: 1000 }),
        ]);
    }
    runDiagnostic() {
        return this.diagnosticService.runFullDiagnostic();
    }
    getApiList() {
        return {
            apiEndpoints: [
                {
                    service: 'auth-service',
                    baseUrl: '/api/v1/auth',
                    endpoints: [
                        { path: '/login', method: 'POST', description: 'User login' },
                        { path: '/register', method: 'POST', description: 'User registration' },
                        { path: '/refresh', method: 'POST', description: 'Refresh access token' },
                        { path: '/logout', method: 'POST', description: 'User logout' },
                        { path: '/verify-email/:token', method: 'GET', description: 'Verify email address' },
                        { path: '/forgot-password', method: 'POST', description: 'Request password reset' },
                        { path: '/reset-password/:token', method: 'POST', description: 'Reset password with token' }
                    ]
                },
                {
                    service: 'auth-service',
                    baseUrl: '/api/v1/admin',
                    endpoints: [
                        { path: '/users', method: 'GET', description: 'List all users (admin only)' },
                        { path: '/users/:id', method: 'GET', description: 'Get user details (admin only)' },
                        { path: '/users/:id', method: 'PATCH', description: 'Update user (admin only)' },
                        { path: '/users/:id', method: 'DELETE', description: 'Delete user (admin only)' }
                    ]
                },
                {
                    service: 'user-service',
                    baseUrl: '/api/v1/users',
                    endpoints: [
                        { path: '/profile', method: 'GET', description: 'Get current user profile' },
                        { path: '/profile', method: 'PATCH', description: 'Update current user profile' },
                        { path: '/profile/password', method: 'PATCH', description: 'Change password' },
                        { path: '/profile/avatar', method: 'POST', description: 'Upload avatar' }
                    ]
                },
                {
                    service: 'board-service',
                    baseUrl: '/api/v1/boards',
                    endpoints: [
                        { path: '/', method: 'GET', description: 'List all boards for current user' },
                        { path: '/', method: 'POST', description: 'Create a new board' },
                        { path: '/:id', method: 'GET', description: 'Get board details' },
                        { path: '/:id', method: 'PATCH', description: 'Update board' },
                        { path: '/:id', method: 'DELETE', description: 'Delete board' },
                        { path: '/:id/members', method: 'GET', description: 'Get board members' },
                        { path: '/:id/members', method: 'POST', description: 'Add board member' },
                        { path: '/:id/members/:userId', method: 'DELETE', description: 'Remove board member' }
                    ]
                },
                {
                    service: 'board-service',
                    baseUrl: '/api/v1/columns',
                    endpoints: [
                        { path: '/', method: 'POST', description: 'Create a new column' },
                        { path: '/:id', method: 'PATCH', description: 'Update column' },
                        { path: '/:id', method: 'DELETE', description: 'Delete column' },
                        { path: '/reorder', method: 'PATCH', description: 'Reorder columns' }
                    ]
                },
                {
                    service: 'board-service',
                    baseUrl: '/api/v1/cards',
                    endpoints: [
                        { path: '/', method: 'POST', description: 'Create a new card' },
                        { path: '/:id', method: 'GET', description: 'Get card details' },
                        { path: '/:id', method: 'PATCH', description: 'Update card' },
                        { path: '/:id', method: 'DELETE', description: 'Delete card' },
                        { path: '/reorder', method: 'PATCH', description: 'Reorder cards' },
                        { path: '/:id/comments', method: 'GET', description: 'Get card comments' },
                        { path: '/:id/comments', method: 'POST', description: 'Add comment to card' },
                        { path: '/:id/assignees', method: 'POST', description: 'Assign user to card' },
                        { path: '/:id/assignees/:userId', method: 'DELETE', description: 'Unassign user from card' }
                    ]
                },
                {
                    service: 'board-service',
                    baseUrl: '/api/v1/labels',
                    endpoints: [
                        { path: '/', method: 'GET', description: 'List all labels for board' },
                        { path: '/', method: 'POST', description: 'Create a new label' },
                        { path: '/:id', method: 'PATCH', description: 'Update label' },
                        { path: '/:id', method: 'DELETE', description: 'Delete label' }
                    ]
                },
                {
                    service: 'notification-service',
                    baseUrl: '/api/v1/notifications',
                    endpoints: [
                        { path: '/', method: 'GET', description: 'Get all notifications for current user' },
                        { path: '/unread', method: 'GET', description: 'Get unread notifications count' },
                        { path: '/:id/read', method: 'PATCH', description: 'Mark notification as read' },
                        { path: '/read-all', method: 'PATCH', description: 'Mark all notifications as read' },
                        { path: '/settings', method: 'GET', description: 'Get notification settings' },
                        { path: '/settings', method: 'PATCH', description: 'Update notification settings' }
                    ]
                },
                {
                    service: 'file-service',
                    baseUrl: '/api/v1/attachments',
                    endpoints: [
                        { path: '/upload', method: 'POST', description: 'Upload file attachment' },
                        { path: '/:id', method: 'GET', description: 'Download file attachment' },
                        { path: '/:id', method: 'DELETE', description: 'Delete file attachment' }
                    ]
                },
                {
                    service: 'auth-service',
                    baseUrl: '/api/docs',
                    endpoints: [
                        { path: '/', method: 'GET', description: 'Swagger API documentation' }
                    ]
                }
            ]
        };
    }
    ping() {
        return {
            status: 'ok',
            service: 'auth-service',
            timestamp: new Date().toISOString(),
        };
    }
};
exports.HealthController = HealthController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get service health status' }),
    (0, terminus_1.HealthCheck)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HealthController.prototype, "check", null);
__decorate([
    (0, common_1.Get)('liveness'),
    (0, swagger_1.ApiOperation)({ summary: 'Liveness probe for Kubernetes' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HealthController.prototype, "liveness", null);
__decorate([
    (0, common_1.Get)('readiness'),
    (0, swagger_1.ApiOperation)({ summary: 'Readiness probe for Kubernetes' }),
    (0, terminus_1.HealthCheck)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HealthController.prototype, "readiness", null);
__decorate([
    (0, common_1.Get)('diagnostic'),
    (0, swagger_1.ApiOperation)({
        summary: 'Run diagnostic checks on all API endpoints',
        description: 'Performs a comprehensive check of all StormMatrix Kanban API endpoints and services to verify their availability and functionality.'
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", rxjs_1.Observable)
], HealthController.prototype, "runDiagnostic", null);
__decorate([
    (0, common_1.Get)('api-list'),
    (0, swagger_1.ApiOperation)({
        summary: 'List all available API endpoints',
        description: 'Returns a comprehensive list of all API endpoints available in the StormMatrix Kanban system.'
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HealthController.prototype, "getApiList", null);
__decorate([
    (0, common_1.Get)('ping'),
    (0, swagger_1.ApiOperation)({ summary: 'Simple ping to check if service is running' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HealthController.prototype, "ping", null);
exports.HealthController = HealthController = __decorate([
    (0, swagger_1.ApiTags)('health'),
    (0, common_1.Controller)('health'),
    __metadata("design:paramtypes", [terminus_1.HealthCheckService,
        terminus_1.TypeOrmHealthIndicator,
        terminus_1.MemoryHealthIndicator,
        terminus_1.DiskHealthIndicator,
        diagnostic_service_1.DiagnosticService])
], HealthController);
//# sourceMappingURL=health.controller.js.map