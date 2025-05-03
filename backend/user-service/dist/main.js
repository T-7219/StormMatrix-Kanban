"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const microservices_1 = require("@nestjs/microservices");
const config_1 = require("@nestjs/config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    app.connectMicroservice({
        transport: microservices_1.Transport.RMQ,
        options: {
            urls: [configService.get('RABBIT_MQ_URI', 'amqp://guest:guest@rabbitmq:5672')],
            queue: 'user_queue',
            queueOptions: {
                durable: true,
            },
        },
    });
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
    }));
    app.enableCors();
    const config = new swagger_1.DocumentBuilder()
        .setTitle('User Service API')
        .setDescription('StormMatrix Kanban User Service API documentation')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    await app.startAllMicroservices();
    console.log('User service microservice is listening for messages');
    const port = process.env.PORT || 3002;
    await app.listen(port);
    console.log(`User service HTTP API is running on: http://localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map