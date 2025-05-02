import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { DiagnosticService } from './diagnostic.service';

@Module({
  imports: [
    TerminusModule,
    TypeOrmModule,
    HttpModule,
  ],
  controllers: [HealthController],
  providers: [DiagnosticService],
})
export class HealthModule {}