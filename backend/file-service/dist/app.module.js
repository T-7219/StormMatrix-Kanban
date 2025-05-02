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
const health_module_1 = require("./health/health.module");
const attachments_module_1 = require("./attachments/attachments.module");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.DB_HOST || 'postgres',
                port: parseInt(process.env.DB_PORT) || 5432,
                username: process.env.DB_USER || 'postgres',
                password: process.env.DB_PASSWORD || 'postgres',
                database: process.env.DB_NAME || 'board_db',
                autoLoadEntities: true,
                synchronize: process.env.NODE_ENV !== 'production',
            }),
            platform_express_1.MulterModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    storage: (0, multer_1.diskStorage)({
                        destination: configService.get('UPLOAD_DIR', '/app/uploads'),
                        filename: (req, file, callback) => {
                            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                            const fileExt = (0, path_1.extname)(file.originalname);
                            const fileName = `${uniqueSuffix}${fileExt}`;
                            callback(null, fileName);
                        },
                    }),
                    limits: {
                        fileSize: 10 * 1024 * 1024,
                    },
                    fileFilter: (req, file, callback) => {
                        const allowedMimes = [
                            'image/jpeg',
                            'image/png',
                            'image/gif',
                            'application/pdf',
                            'application/msword',
                            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                            'application/vnd.ms-excel',
                            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                        ];
                        if (allowedMimes.includes(file.mimetype)) {
                            callback(null, true);
                        }
                        else {
                            callback(new Error('Unsupported file type'), false);
                        }
                    },
                }),
            }),
            health_module_1.HealthModule,
            attachments_module_1.AttachmentsModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map