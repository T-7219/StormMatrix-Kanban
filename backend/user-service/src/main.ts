import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  
  // Setup microservice transport for RabbitMQ
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [configService.get<string>('RABBIT_MQ_URI', 'amqp://guest:guest@rabbitmq:5672')],
      queue: 'user_queue',
      queueOptions: {
        durable: true,
      },
    },
  });
  
  // Global prefix for all routes
  app.setGlobalPrefix('api/v1');
  
  // Enable validation pipes
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));
  
  // Enable CORS
  app.enableCors();
  
  // Setup Swagger
  const config = new DocumentBuilder()
    .setTitle('User Service API')
    .setDescription('StormMatrix Kanban User Service API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  
  // Start microservices
  await app.startAllMicroservices();
  console.log('User service microservice is listening for messages');
  
  // Start the HTTP server
  const port = process.env.PORT || 3002;
  await app.listen(port);
  console.log(`User service HTTP API is running on: http://localhost:${port}`);
}

bootstrap();