"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const microservices_1 = require("@nestjs/microservices");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const two_factor_auth_module_1 = require("./two-factor-auth/two-factor-auth.module");
const health_module_1 = require("./health/health.module");
const admin_module_1 = require("./admin/admin.module");
const metrics_module_1 = require("./metrics/metrics.module");
const app_controller_1 = require("./app.controller");
const configuration_1 = require("./config/configuration");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [configuration_1.default],
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    type: 'postgres',
                    host: configService.get('database.host'),
                    port: configService.get('database.port'),
                    username: configService.get('database.username'),
                    password: configService.get('database.password'),
                    database: configService.get('database.name'),
                    entities: [__dirname + '/**/*.entity{.ts,.js}'],
                    synchronize: configService.get('nodeEnv') !== 'production',
                    logging: configService.get('nodeEnv') === 'development',
                }),
            }),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    secret: configService.get('jwt.secret'),
                    signOptions: {
                        expiresIn: configService.get('jwt.expiresIn'),
                    },
                }),
            }),
            microservices_1.ClientsModule.registerAsync([
                {
                    name: 'USER_SERVICE',
                    imports: [config_1.ConfigModule],
                    inject: [config_1.ConfigService],
                    useFactory: (configService) => ({
                        transport: microservices_1.Transport.RMQ,
                        options: {
                            urls: [configService.get('rabbitmq.uri')],
                            queue: 'user_queue',
                            queueOptions: {
                                durable: true,
                            },
                        },
                    }),
                },
                {
                    name: 'NOTIFICATION_SERVICE',
                    imports: [config_1.ConfigModule],
                    inject: [config_1.ConfigService],
                    useFactory: (configService) => ({
                        transport: microservices_1.Transport.RMQ,
                        options: {
                            urls: [configService.get('rabbitmq.uri')],
                            queue: 'notification_queue',
                            queueOptions: {
                                durable: true,
                            },
                        },
                    }),
                },
            ]),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            two_factor_auth_module_1.TwoFactorAuthModule,
            health_module_1.HealthModule,
            admin_module_1.AdminModule,
            metrics_module_1.MetricsModule,
        ],
        controllers: [app_controller_1.AppController],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map