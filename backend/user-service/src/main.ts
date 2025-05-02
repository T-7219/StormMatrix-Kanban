import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
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
  
  // Start the server
  const port = process.env.PORT || 3002;
  await app.listen(port);
  console.log(`User service is running on: http://localhost:${port}`);
}

bootstrap();