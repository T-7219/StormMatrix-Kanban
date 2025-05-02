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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetricsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const nestjs_prometheus_1 = require("@willsoto/nestjs-prometheus");
const prom_client_1 = require("prom-client");
let MetricsController = class MetricsController {
    constructor(loginAttemptsCounter, activeUsersGauge, registrationsCounter, failedLoginAttemptsCounter) {
        this.loginAttemptsCounter = loginAttemptsCounter;
        this.activeUsersGauge = activeUsersGauge;
        this.registrationsCounter = registrationsCounter;
        this.failedLoginAttemptsCounter = failedLoginAttemptsCounter;
        this.activeUsersGauge.set(10);
    }
    getMetrics() {
        return '';
    }
    incrementLoginAttempt() {
        this.loginAttemptsCounter.inc();
    }
    incrementFailedLoginAttempt() {
        this.failedLoginAttemptsCounter.inc();
    }
    incrementRegistration() {
        this.registrationsCounter.inc();
    }
    updateActiveUsers(count) {
        this.activeUsersGauge.set(count);
    }
};
exports.MetricsController = MetricsController;
__decorate([
    (0, common_1.Get)('metrics'),
    (0, swagger_1.ApiExcludeEndpoint)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MetricsController.prototype, "getMetrics", null);
exports.MetricsController = MetricsController = __decorate([
    (0, common_1.Controller)(),
    __param(0, (0, nestjs_prometheus_1.InjectMetric)('login_attempts_total')),
    __param(1, (0, nestjs_prometheus_1.InjectMetric)('active_users')),
    __param(2, (0, nestjs_prometheus_1.InjectMetric)('registrations_total')),
    __param(3, (0, nestjs_prometheus_1.InjectMetric)('failed_login_attempts_total')),
    __metadata("design:paramtypes", [prom_client_1.Counter,
        prom_client_1.Gauge,
        prom_client_1.Counter,
        prom_client_1.Counter])
], MetricsController);
//# sourceMappingURL=metrics.controller.js.map