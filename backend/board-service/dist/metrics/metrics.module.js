"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetricsModule = void 0;
const common_1 = require("@nestjs/common");
const metrics_controller_1 = require("./metrics.controller");
const nestjs_prometheus_1 = require("@willsoto/nestjs-prometheus");
let MetricsModule = class MetricsModule {
};
exports.MetricsModule = MetricsModule;
exports.MetricsModule = MetricsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_prometheus_1.PrometheusModule.register({
                path: '/metrics',
                defaultMetrics: {
                    enabled: true,
                },
            }),
        ],
        controllers: [metrics_controller_1.MetricsController],
        providers: [
            (0, nestjs_prometheus_1.makeCounterProvider)({
                name: 'boards_created_total',
                help: 'Total number of boards created',
            }),
            (0, nestjs_prometheus_1.makeCounterProvider)({
                name: 'cards_created_total',
                help: 'Total number of cards created',
            }),
            (0, nestjs_prometheus_1.makeGaugeProvider)({
                name: 'active_boards',
                help: 'Number of active boards',
            }),
            (0, nestjs_prometheus_1.makeCounterProvider)({
                name: 'card_movements_total',
                help: 'Total number of card movements between columns',
            }),
        ],
    })
], MetricsModule);
//# sourceMappingURL=metrics.module.js.map