import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Global prefix for all routes
  app.setGlobalPrefix('api/v1');
  
  // Enable CORS
  app.enableCors();
  
  // Use helmet for security headers
  app.use(helmet());
  
  // Enable validation pipes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  
  // Swagger API documentation
  const config = new DocumentBuilder()
    .setTitle('StormMatrix Kanban - Board Service API')
    .setDescription('Board and card management API for StormMatrix Kanban')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  
  // Start server
  const port = process.env.PORT || 3003;
  await app.listen(port);
  console.log(`Board service running on port ${port}`);
}

bootstrap();